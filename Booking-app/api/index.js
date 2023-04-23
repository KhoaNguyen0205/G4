const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('./models/User.js'); 
const Place = require('./models/Place.js');
const Booking = require('./models/Booking.js');
const Comment = require('./models/Comment.js')
const cookieParser = require('cookie-parser'); 
const imageDownloader = require('image-downloader');
const multer = require('multer')
const fs = require('fs');
const exp = require('constants');
const { resolve } = require('path');
const { rejects } = require('assert');

require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'ngockhoangockhoangockhoa'; 

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname +'/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

mongoose.connect(process.env.MONGO_URL)

function getUserDataFromReq(req){
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if(err) throw err;
            resolve(userData);
         });
    });
};


app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register' , async (req , res)=>{
    const {name,email,password} = req.body;
    try{
        const userDoc = await User.create({ 
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
        }); 
        res.json(userDoc);
    }catch(e) {
        res.status(422).json(e);
    }

});


app.post('/login' , async (req , res) => { 
  const {email,password} = req.body; 
  const userDoc = await User.findOne({email});
  if(userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if(passOk) {
        jwt.sign({
            email:userDoc.email, 
            id:userDoc._id, 
            name: userDoc.name
        }, jwtSecret,{},(err,token) => {
            if(err) throw err;
            res.cookie('token', token).json(userDoc);
        });
    }else{
        res.status(422).json('pass not ok');
    }
  }else{
    res.json('not found');
  }
});

app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    if(token) { 
        console.log(token, "token")
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if(err) throw err;
           const {name,email,_id} = await User.findById(userData.id);
            res.json({name,email,_id});
        });
    }else {
        res.json(null);
    }
});

app.post('/logout', (req, res) => {
   res.cookie('token', '').json(true);
});

console.log({__dirname});
app.post('/upload-by-link' , async (req , res)=>{
  const {link} = req.body;
  const newName = Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' +newName,
  });
  res.json(newName);
}) 

const photosMiddleware = multer({dest:'./uploads/'});
app.post('/upload', photosMiddleware.array('photos', 100),  (req,res) =>{
   const uploadedFiles = [];
    for ( let i = 0 ; i < req.files.length; i++){
   const {path,originalname} = req.files[i]; 
   const parts = originalname.split('.');
   const ext = parts[parts.length - 1];
   const newPath = path + '.' + ext;
   fs.renameSync(path, newPath);
   uploadedFiles.push(newPath.replace('/uploads', ''));
}
  res.json(uploadedFiles);
});

app.post('/places', (req,res) => {
    const {token} = req.cookies;
    const {
        title,address,photos,description,price,
        perks,extraInfo,checkIn,checkOut,maxGuests,approval,
     } = req.body; 
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if(err) throw err;
       const placeDoc =  await Place.create({      
            owner: userData.id,price,
            title,address,photos,description,
            perks,extraInfo,checkIn,checkOut,maxGuests,
            approval:false,
        });
        res.json(placeDoc);
    });
});

app.post('/places/:id/comments', async (req, res) => {
    try {
        const userData = await getUserDataFromReq(req);
        const content = req.body.content;
        const placeId = req.params.id; 

        const commentDoc = await Comment.create({
            user: userData.id,
            place: placeId, 
            content,
        });
        res.json(commentDoc);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/user-places' , (req,res) => { 
    const {token} = req.cookies; 
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData;
        res.json( await Place.find({owner:id}));
    });
});

app.get('/place-bookings' , (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, placeData) => {
        const {id} = placeData;
        res.json( await Booking.find({Place:id}));
    });
})

app.get('/places/:id', async (req,res) => {
    const {id} = req.params;
    res.json(await Place.findById(id))
});

app.get('/details/:id' ,async(req,res) => {
    const {id} = req.params;
    res.json(await Place.findById(id))
  });


app.put('/places', async (req,res) =>{
    const {token} = req.cookies;
    const {
        id,title,address,photos,description,
        perks,extraInfo,checkIn,checkOut,maxGuests,price,approval,comments,
    }= req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
      const placeDoc = await Place.findById(id);
      if(userData.id === placeDoc.owner.toString()){
        placeDoc.set({
            title,address,photos,description,
            perks,extraInfo,checkIn,checkOut,maxGuests,price,approval:false,comments,
        });
        await placeDoc.save();
        res.json('ok');
      }
    });
});

app.put('/places/:id', (req, res) => {
    const { id } = req.params;
    const { approval } = req.body;
    Place.findByIdAndUpdate(id, { approval }, { new: true })
        .then(placeDoc => {
            res.json(placeDoc);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send("Lỗi cập nhật địa điểm");
        });
});

app.post('/bookings',async (req, res) => {
   const userData = await getUserDataFromReq(req);
   const{
    place,checkIn,checkOut,numberOfGuests,name,phone,price,
   }= req.body;
    Booking.create({
        place,checkIn,checkOut,numberOfGuests,name,phone,price,
        user:userData.id,
    }).then((doc)=>{
        res.json(doc);
    }).catch((err)=>{
        throw err;
    });
});  

app.get('/bookings',async (req, res)=> {
  const userData = await  getUserDataFromReq(req);
  res.json(await Booking.find({user:userData.id}).populate('place'));
});

app.get('/user',async(req,res) => {
    res.json(await User.find())
  })

app.get('/places',async(req, res) => {
    res.json(await Place.find())
})

app.get('/bookings1',async(req, res) => {
    res.json(await Booking.find())
})

app.get('/comment', async(req,res) => {
    res.json(await Comment.find())
})

app.delete('/delete/:id' ,async(req,res) => {
    const id = req.params.id;
    await User.findByIdAndRemove(id).exec();
    res.send('delete');
})

app.delete('/deletePlace/:id' ,async(req,res) => {
    const id = req.params.id;
    await Place.findByIdAndRemove(id).exec();
    res.send('delete');
});

app.get('/places', async (req, res) => {
    const { title, address } = req.query;
    const query = {};
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }
    if (address) {
      query.address = { $regex: address, $options: 'i' };
    }
    const places = await Place.find(query);
    res.json(places);
  });
  


app.listen(4000);    