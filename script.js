function calculate() {
    // Lấy giá trị nhập vào
    var birthdateInput = document.getElementById('birthdate').value;
    var birthhourInput = parseInt(document.getElementById('birthhour').value);
    var gender = document.getElementById('gender').value;
    var yearBuild = parseInt(document.getElementById('yearBuild').value);
    var houseDir = document.getElementById('houseDirection').value;
    var slope = document.getElementById('slope').checked;
    var slopeDir = document.getElementById('slopeDir').value;
    var road = document.getElementById('road').checked;
    var roadDir = document.getElementById('roadDir').value;
    var waterDist = parseInt(document.getElementById('waterDistance').value) || 0;
    var hospital = document.getElementById('hospital').checked;
    var temple = document.getElementById('temple').checked;
    var church = document.getElementById('church').checked;
    var cemetery = document.getElementById('cemetery').checked;
    // Kiểm tra đầu vào
    if (!birthdateInput || isNaN(birthhourInput) || isNaN(yearBuild)) {
        alert("Vui lòng nhập đầy đủ ngày sinh, giờ sinh và năm xây nhà.");
        return;
    }
    var birthDate = new Date(birthdateInput);
    var birthYear = birthDate.getFullYear();
    // Can Chi: tính Thiên Can và Địa Chi của năm sinh
    var stems = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
    var branches = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
    var stem = stems[(birthYear - 4) % 10];
    var branch = branches[(birthYear - 4) % 12];
    var canChi = stem + ' ' + branch;
    // Mệnh ngũ hành từ Thiên Can
    var element = "";
    if (stem === 'Giáp' || stem === 'Ất') element = 'Mộc';
    else if (stem === 'Bính' || stem === 'Đinh') element = 'Hỏa';
    else if (stem === 'Mậu' || stem === 'Kỷ') element = 'Thổ';
    else if (stem === 'Canh' || stem === 'Tân') element = 'Kim';
    else if (stem === 'Nhâm' || stem === 'Quý') element = 'Thủy';
    // Tính Cung phi (quái mệnh) theo năm sinh và giới tính
    var lastTwo = birthYear % 100;
    var a = Math.floor(lastTwo / 10) + (lastTwo % 10);
    if (a > 9) { a = Math.floor(a / 10) + (a % 10); }
    var K;
    if (birthYear < 2000) {
        if (gender === 'nam') {
            K = 10 - a;
        } else {
            K = 5 + a;
        }
    } else {
        if (gender === 'nam') {
            K = 9 - a;
        } else {
            K = 6 + a;
        }
    }
    if (K > 9) { K = Math.floor(K / 10) + (K % 10); }
    var kuaMap = {1:'Khảm', 2:'Khôn', 3:'Chấn', 4:'Tốn', 6:'Càn', 7:'Đoài', 8:'Cấn', 9:'Ly'};
    var kua;
    if (K === 5) {
        kua = (gender === 'nam' ? 'Khôn' : 'Cấn');
    } else {
        kua = kuaMap[K] || '';
    }
    var quaiMenh = kua + ' Mệnh';
    // Tính tuổi xây nhà (tuổi mụ)
    var age = yearBuild - birthYear + 1;
    // Kiểm tra Kim Lâu
    var kimLau = false;
    var kimLauType = "";
    var mod9 = age % 9;
    if (mod9 === 1 || mod9 === 3 || mod9 === 6 || mod9 === 8) {
        kimLau = true;
        if (mod9 === 1) kimLauType = 'Kim Lâu Thân';
        if (mod9 === 3) kimLauType = 'Kim Lâu Thê';
        if (mod9 === 6) kimLauType = 'Kim Lâu Tử';
        if (mod9 === 8) kimLauType = 'Kim Lâu Súc';
    }
    // Kiểm tra Hoàng Ốc
    var hoangOc = false;
    var hoangOcType = "";
    var mod9Hoang = age % 9;
    if (mod9Hoang === 0 || mod9Hoang === 3 || mod9Hoang === 5 || mod9Hoang === 6) {
        hoangOc = true;
        if (mod9Hoang === 3 || mod9Hoang === 0) hoangOcType = 'Tam Địa Sát';
        if (mod9Hoang === 5) hoangOcType = 'Ngũ Thọ Tử';
        if (mod9Hoang === 6) hoangOcType = 'Lục Hoang Ốc';
    }
    // Kiểm tra Tam Tai
    var birthZodiac = branch;
    var buildBranch = branches[(yearBuild - 4) % 12];
    var tamTai = false;
    if (['Thân','Tý','Thìn'].includes(birthZodiac) && ['Dần','Mão','Thìn'].includes(buildBranch)) tamTai = true;
    if (['Dần','Ngọ','Tuất'].includes(birthZodiac) && ['Thân','Dậu','Tuất'].includes(buildBranch)) tamTai = true;
    if (['Tỵ','Dậu','Sửu'].includes(birthZodiac) && ['Hợi','Tý','Sửu'].includes(buildBranch)) tamTai = true;
    if (['Hợi','Mão','Mùi'].includes(birthZodiac) && ['Tỵ','Ngọ','Mùi'].includes(buildBranch)) tamTai = true;
    // Hiển thị kết quả
    var result = '<h2>Kết quả tra cứu phong thủy</h2>';
    result += '<p><strong>Can Chi (năm sinh):</strong> ' + canChi + '</p>';
    result += '<p><strong>Mệnh ngũ hành:</strong> ' + element + '</p>';
    result += '<p><strong>Cung mệnh (cung phi):</strong> ' + quaiMenh + '</p>';
    result += '<p><strong>Tuổi xây nhà (' + age + ' tuổi):</strong> ';
    if (kimLau) {
        result += '<span style="color:red">Phạm ' + kimLauType + '</span>';
    } else {
        result += '<span style="color:green">Không phạm Kim Lâu</span>';
    }
    if (hoangOc) {
        result += ' , <span style="color:red">Phạm ' + hoangOcType + '</span>';
    } else {
        result += ' , <span style="color:green">Không phạm Hoàng Ốc</span>';
    }
    if (tamTai) {
        result += ' , <span style="color:red">Phạm Tam Tai</span>';
    } else {
        result += ' , <span style="color:green">Không phạm Tam Tai</span>';
    }
    result += '</p>';
    // Phân tích các yếu tố phong thủy xấu đã chọn
    var badFactors = '<p><strong>Các yếu tố phong thủy xấu đã chọn:</strong></p><ul>';
    var hasBad = false;
    if (slope && slopeDir) {
        hasBad = true;
        badFactors += '<li>Đất dốc xuống mặt tiền (hướng ' + slopeDir + '): Có thể làm khí ứ đọng và thoát ra nhanh, gia chủ dễ hao tổn tài lộc.</li>';
    }
    if (road && roadDir) {
        hasBad = true;
        badFactors += '<li>Đường đâm thẳng vào cửa (hướng ' + roadDir + '): Tạo luồng khí xấu trực xung vào nhà, dễ gặp tai ương và ảnh hưởng sức khỏe.</li>';
    }
    if (waterDist) {
        hasBad = true;
        badFactors += '<li>Nước trước cửa cách ' + waterDist + ' m: Theo phong thủy, nước trước cửa (nhất là quá gần) có thể làm tiêu tan vượng khí, ảnh hưởng tài lộc và sức khỏe.</li>';
    }
    if (hospital) {
        hasBad = true;
        badFactors += '<li>Bệnh viện trước nhà: Thuộc về âm khí, dễ gây lo âu, ốm đau cho gia chủ.</li>';
    }
    if (temple) {
        hasBad = true;
        badFactors += '<li>Chùa/Đình/Miếu trước cửa: Nơi tụ âm khí, có thể khiến phong thủy ngôi nhà kém vượng, ảnh hưởng tới may mắn của gia đình.</li>';
    }
    if (church) {
        hasBad = true;
        badFactors += '<li>Nhà thờ trước cửa: Tương tự như chùa, mang âm khí nhất định, có thể gây bất lợi cho vượng khí trong nhà.</li>';
    }
    if (cemetery) {
        hasBad = true;
        badFactors += '<li>Nghĩa địa trước nhà: Thuộc Tam Sát, rất không tốt cho gia chủ, dễ gặp tang sự, xui xẻo.</li>';
    }
    if (hasBad) {
        badFactors += '</ul>';
        result += badFactors;
    } else {
        result += '<p>Không có yếu tố phong thủy xấu nào được chọn.</p>';
    }
    document.getElementById('result').innerHTML = result;
}
