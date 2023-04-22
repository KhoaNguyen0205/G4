const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  place: {type: mongoose.Schema.Types.ObjectId, ref: 'Place'},
  content: String,
  });

  const CommentModel = mongoose.model('Comment', CommentSchema);

  module.exports = CommentModel;