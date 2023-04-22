import { useState } from "react";

export default function AdminFooter() {
    
    const [activeOption, setActiveOption] = useState(null);

    const handleOptionClick = (event) => {
      const selectedOption = event.target;
  
      // Xoá lớp 'active' trên tất cả các phần tử có class là 'card-option'
      const options = document.querySelectorAll('.card-option');
      options.forEach((option) => {
        option.classList.remove('active');
      });
  
      // Thêm lớp 'active' vào phần tử được chọn
      selectedOption.classList.add('active');
  
      // Cập nhật trạng thái lựa chọn
      setActiveOption(selectedOption);
    };
    return(
        <div class="flex-options" onClick={handleOptionClick}>
            <div class="card-option active">
                <div class="card-label">
                    <div class="icon">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="info">
                        <h4>MG</h4>
                        <p>Megha Gajjar</p>
                    </div>
                </div>
            </div>

            <div class="card-option">
                <div class="card-label">
                    <div class="icon">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="info">
                        <h4>MG</h4>
                        <p>Megha Gajjar</p>
                    </div>
                </div>
            </div>

            <div class="card-option">
                <div class="card-label">
                    <div class="icon">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="info">
                        <h4>MG</h4>
                        <p>Megha Gajjar</p>
                    </div>
                </div>
            </div>

            <div class="card-option">
                <div class="card-label">
                    <div class="icon">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="info">
                        <h4>MG</h4>
                        <p>Megha Gajjar</p>
                    </div>
                </div>
            </div>

            <div class="card-option">
                <div class="card-label">
                    <div class="icon">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="info">
                        <h4>MG</h4>
                        <p>Megha Gajjar</p>
                    </div>
                </div>
            </div>
        </div>
    );
}