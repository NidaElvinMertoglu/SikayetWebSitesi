function navigationBar() {
  const loggedInUser = localStorage.getItem('Kullanici');

  
  if (loggedInUser === 'ali@hotmail.com') {
    document.getElementById('uyeHarici').style.display = 'none';
    document.getElementById('girisSonrasi').style.display = 'block';
    document.getElementById('girisSonrasiSirket').style.display = 'none';
  } else if (loggedInUser === 'teknik@samsung.com.tr') { 
    document.getElementById('uyeHarici').style.display = 'none';
    document.getElementById('girisSonrasi').style.display = 'none';
    document.getElementById('girisSonrasiSirket').style.display = 'block';
  } else { 
    document.getElementById('uyeHarici').style.display = 'block';
    document.getElementById('girisSonrasi').style.display = 'none';
    document.getElementById('girisSonrasiSirket').style.display = 'none';
  }
}

function logOut() {
  localStorage.removeItem('Kullanici');
  window.location.href = 'index.html';
}



const complaintsKey = 'complaints';

function loadComplaints() {
  
  const storedComplaints = JSON.parse(localStorage.getItem(complaintsKey));
  return storedComplaints || {};
}

function saveComplaints(complaints) {
  localStorage.setItem(complaintsKey, JSON.stringify(complaints));
}


function addComplaint() {
  var title = document.querySelector('input[placeholder="Şikayet Başlığı"]').value;
  var detail = document.querySelector('textarea[placeholder="Şikayet detayı"]').value;
  var company = document.getElementById('userCompany').value;

  var today = new Date();
  var complaintDate = today.toISOString().slice(0, 10); // YYYY-MM-DD
  var status = "Açık/Çözülemedi";

  var complaint = { title: title, detail: detail, company: company, date: complaintDate, status: status ,answers: []};


  var storedComplaints = loadComplaints();
  if (!storedComplaints[company]) {
    storedComplaints[company] = []; 
  }
  storedComplaints[company].push(complaint);
  saveComplaints(storedComplaints);

  renderComplaints(document.getElementById('complaintsList'));
}


function renderComplaints(listElement) {

  if (!listElement) {
    console.error('Liste boş');
    return;
  }
  listElement.innerHTML = ''; 

  const storedComplaints = loadComplaints();

  for (const company in storedComplaints) {
    storedComplaints[company].forEach(function(complaint, index) {
      var listItem = document.createElement('li');
     
      listItem.innerHTML = `
        <strong>Şikayet Başlığı:</strong> ${complaint.title}<br>
        <strong>Şikayet Detayı:</strong> ${complaint.detail}<br>
        <strong>Firma:</strong> ${complaint.company}<br>
        <strong>Tarih:</strong> ${complaint.date}<br>
        <strong>Durum:</strong> ${complaint.status}
      `;

      listItem.addEventListener('click', function() {
        window.location.href = `sikayetguncelle.html?index=${index}&company=${company}`;
      });

      listElement.appendChild(listItem);
    });
  }
}

function addDefaultComplaints() {
  const storedComplaints = loadComplaints();

  if (!storedComplaints || Object.keys(storedComplaints).length === 0) {
    const defaultComplaints = [
      {
        title: "PTT Kargo Weaccept Barkodlu Alıcı Ödemeli Mesaj",
        detail: "Weaccept tarafından adınıza, UD20234328462 barkodlu alıcı ödemeli gönderi kabul edilmiştir. Ödeme: Kredi kartı. Tutar: 12.345,23 TL. Benimle hiçbir alakası olmayan bir kurumdan bu tür bir mesaj aldım. Kargo ve ödemelerle herhangi bir bağlantım yoktur. ",
        company: "PTT",
        date: "2023-09-08",
        status: "Açık/Çözülemedi",
        answer: []
      },
      {
        title: "Burger King Soğuk Hamburger Yenir Mi?",
        detail: "İzmir Gül Mahallesi'ndeki Burger King şubesi ne yazık ki vasatın ötesinde. İlgi ve alaka yok, hijyen konusunda sıfır, ekmek bayat, patates bayat ve hamburger soğuk, adeta buz gibi. Birkaç kez başımıza geldiğinden dolayı yazma ihtiyacı hissettim. Umarım en kısa zamanda kendinizi düzeltirsiniz.",
        company: "Burger King",
        date: "2023-23-10",
        status: "Açık/Çözülemedi",
        answer: []
      },
      {
        title: "Zara Home Online Aldığım Ürünlerim 15 Gün Oldu Ama Gelmedi",
        detail: "Zara Home online'dan ürün aldım, 15 gün oldu ama hala gelmedi. Sebebini, kargo firmasından kaynaklandığını söylemelerine rağmen süreci hızlandırdıklarını düşünmüyorum. Bu kadar e-posta göndermeme rağmen ürünlerim hala gelmedi.",
        company: "Zara Home",
        date: "2023-01-27",
        status: "Çözüldü",
        answer: []
      },
      {
        title: "Toshiba Klima Pişmanlığı, 10m2 Alanı Soğutamıyor!",
        detail: "Toshiba marka klima aldım, almaz olaydım. 10m2 alanı soğutmuyor. Kaç kere servis geldi. Bu böyle teknoloji daha fazla bir şey beklemeyin diyor. O kadar para verdim iyisi olsun diye. Toshiba pişmanlıktır! RAS-M10N3KV2-TR1.",
        company: "Toshiba",
        date: "2023-10-17",
        status: "Açık/Çözülemedi",
        answer: []
      },
      {
        title: "Mitsubishi Electric Tamir Edilmeyen Klima",
        detail: "Beğenerek kullandığım Mitsubishi Electric MSZ-EF35VE2W model klimam çalışırken durdu. Servisi aradım geldiler, temizlik yapılması gerektiğini söylediler. Yaptılar servis gittikten sonra tekrar arıza yapmaya başladı. Tekrar aradığımda öyle bir arıza kodu olmadığını söylediler. İlgilenmediler.",
        company: "Mitsubishi",
        date: "2023-09-17",
        status: "Açık/Çözülemedi",
        answer: []
      },
      {
        title: "Hilton Hotels Antalya Hilton Otel Rezervasyon Sorunu ",
        detail: "Bir arkadaşımız, Antalya Hilton otel için üç kişilik oda ayırttı. Odaya bakmak üzere çıktığımızda üç tane küçük yatak gördük ve yataklarımızın küçük olduğunu, burada kalamayacağımızı dile getirdik. Ücret iadesi talep ettiğimizde, 'Odaya baktınız, ücretinizi iade edemeyiz' yanıtını aldık. Odayı hiçbir şekilde kullanmadan, sadece 1 dakika içinde 'Biz yardımcı olamayız' dediler. Yetkili ile görüşmek istediğimizde ise bizi yetkili ile görüştürmediler. Bu otele nasıl beş yıldız verildiğine şaşırıyorum.",
        company: "Hilton Hotels",
        date: "2020-12-01",
        status: "Açık/Çözülemedi",
        answer: []
      },
      {
        title: "İngiliz Kültür Yabancı Dil Kursları Para İademizi Alamıyoruz!",
        detail: "Dört kişi olarak başladığımız kursta, iş vardiya sistemimizin değişmesi nedeniyle ayrılmak zorunda kaldığımız İzmir Bornova şubesinden diğerleri gibi biz de para iademizi alamıyoruz. 9 Ekim'de ayrılmak için attığımız imzadan \"Yedi gün sonra sıraya alındınız, muhasebemize bilgi verildi, e-posta gönderildi, sözleşmenizde 45 gün iade süreci yazıyor\" gibi gerçek dışı beyanlarla yaklaşık 70 gündür oyalanıyoruz.",
        company: "İngiliz Kültür Yabancı Dil Kursları",
        date: "2022-12-01",
        status: "Çözüldü",
        answer: []
      },
      {
        title: "Voonka Beauty Plus Collagen Baş Dönmesi Yaptı ",
        detail: "Voonka Collagen Beauty Plus tekli kullanımlık toz paketini kullandıktan sonra çok fazla baş dönmesi ve mide bulantısı yaşadım. Sorun benden kaynaklı mı diye düşündüm fakat deneme amaçlı bir daha içtiğimde de aynı şey oldu. Toplatılmalı ve denetim yapılmalıdır!",
        company: "Voonka Beauty",
        date: "2023-01-12",
        status: "Açık/Çözülemedi",
        answer: []
      },
      {
        title: "VakıfBank Hizmetlerinde Yaşanan Sorunlar",
        detail: "VakıfBank'ta muhatap bulmak, müşteri hizmetlerine bağlanmak çok zor. Sanal pos ile ilgili işlemi yarım saatte çözemedik. Tek bir muhatap bile yok. Sesli arama servisi çalışmıyor, aynı şeyi 10 kere tekrarladım. Gerçekten çok kötü bir hizmetleri var. Sanal posu da iptal ediyorum. Bir daha VakıfBank'ın önünden dahi geçmeyeceğim.",
        company: "VakıfBank",
        date: "2023-01-01",
        status: "Açık/Çözülemedi",
        answer: []
      },
      {
        title: "General Mobile GM 20 Pro Parmak İzi Sorunu",
        detail: "General Mobile GM 20 Pro'yu 2 yıldır kullanıyorum ve bir sorun yaşamadım. Ancak yakın zamanda parmak izi ile ilgili bir sıkıntı ortaya çıktı, 'Parmak izi kullanılamıyor' uyarısı alıyorum. Herhangi bir düşme veya su teması olmadı. Sebebi ne olabilir?",
        company: "General Mobile",
        date: "2023-10-24",
        status: "Çözüldü",
        answer: []
      },
      {
        title: "General Mobile Kulaklığı Takmadığı Halde Kulaklık Takılı Görünüyor",
        detail: "General Mobile GM 21 markalı telefonu kullanıyorum. Kulaklığı takmadığım halde kulaklık takılı görünüyor ve biri aradığı zaman veya müzik dinlediğim zaman hoparlörden ses gelmiyor. Kulaklığı taktığım zaman iletişim kurabiliyorum. Sorunu nasıl çözebilirim?",
        company: "General Mobile",
        date: "2023-10-24",
        status: "Çözüldü",
        answer: []
      }
    ];

    defaultComplaints.forEach(complaint => {
      if (!storedComplaints[complaint.company]) {
        storedComplaints[complaint.company] = []; 
      }
      storedComplaints[complaint.company].push(complaint);
    });

    saveComplaints(storedComplaints);
  }
}



function showSamsungComplaints() {
  const complaints = loadComplaints(); // Şikayetleri yükleme işlemi
  const samsungComplaints = complaints['Samsung']; // Samsung firmasına ait şikayetler

  if (!samsungComplaints) {
    console.log('samsung Firması ile ilgili şikayet bulunamadı.');
    return;
  }

  const listElement = document.getElementById('firmaSikayetleri');

  listElement.innerHTML = ''; // Listeyi temizle

  samsungComplaints.forEach(function(complaint, index) {
    var listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>Şikayet Başlığı:</strong> ${complaint.title}<br>
      <strong>Şikayet Detayı:</strong> ${complaint.detail}<br>
      <strong>Firma:</strong> ${complaint.company}<br>
      <strong>Tarih:</strong> ${complaint.date}<br>
      <strong>Durum:</strong> ${complaint.status}
    `;

    listItem.addEventListener('click', function() {
      openResponsePage(index, complaint.company);
    });

    listElement.appendChild(listItem);
  });
}

function openResponsePage(index, company) {
  // Şikayetin index ve firma bilgisini kullanarak firmacevap.html sayfasına yönlendirme yapalım
  window.location.href = `firmacevap.html?index=${index}&company=${company}`;
}

function showFilteredComplaints(filteredComplaints) {
  const listElement = document.getElementById('firmaSikayetleri');

  if (!listElement) {
    console.error('Liste bulunamadı.');
    return;
  }

  listElement.innerHTML = ''; // Listeyi temizle

  filteredComplaints.forEach(function(complaint, index) {
    var listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>Şikayet Başlığı:</strong> ${complaint.title}<br>
      <strong>Şikayet Detayı:</strong> ${complaint.detail}<br>
      <strong>Firma:</strong> ${complaint.company}<br>
      <strong>Tarih:</strong> ${complaint.date}<br>
      <strong>Durum:</strong> ${complaint.status}
    `;

    listItem.addEventListener('click', function() {
      // Şikayetin index ve firma bilgisini kullanarak firmacevap.html sayfasına yönlendirme yapalım
      window.location.href = `firmacevap.html?index=${index}&company=${complaint.company}`;
    });

    listElement.appendChild(listItem);
  });
}


function handleSearch(event) {
  event.preventDefault(); // Formun varsayılan gönderimini engelle

  const searchTerm = document.getElementById('search').value.toLowerCase(); // Arama terimini al
  const allComplaints = loadComplaints(); // Tüm şikayetleri yükle

  const samsungComplaints = allComplaints['Samsung'] || []; // Sadece samsung şikayetlerini al

  const filteredComplaints = samsungComplaints.filter(complaint =>
    Object.values(complaint).some(
      value => typeof value === 'string' && value.toLowerCase().includes(searchTerm)
    )
  );

  showFilteredComplaints(filteredComplaints); // Eşleşen şikayetleri göster
}

function showCompanyComplaints(company) {
  const storedComplaints = loadComplaints();
  const companyComplaints = storedComplaints[company];
  const complaintsList = document.getElementById('complaintsList');

  if (companyComplaints && companyComplaints.length > 0) {
      companyComplaints.forEach(function(complaint) {
          const listItem = document.createElement('li');
          listItem.classList.add('list-group-item');
          listItem.innerHTML = `
              <strong>Şikayet Başlığı:</strong> ${complaint.title}<br>
              <strong>Şikayet Detayı:</strong> ${complaint.detail}<br>
              <strong>Tarih:</strong> ${complaint.date}<br>
              <strong>Durum:</strong> ${complaint.status}<br>
              <button class="cvbtn"onclick="showAnswer('${company}', '${complaint.title}')">Cevapları Gör</button>
              <ul id="answers_${complaint.title}" class="answer-list" style="display:none;"></ul>
          `;
          complaintsList.appendChild(listItem);
      });
  } else {
      const noComplaintsItem = document.createElement('li');
      noComplaintsItem.classList.add('list-group-item');
      noComplaintsItem.innerText = 'Bu firma ile ilgili şikayet bulunamadı.';
      complaintsList.appendChild(noComplaintsItem);
  }
}

function showAnswer(company, complaintTitle) {
  const storedComplaints = loadComplaints();
  const selectedComplaint = storedComplaints[company].find(complaint => complaint.title === complaintTitle);
  const answerList = document.getElementById(`answers_${complaintTitle}`);

  if (selectedComplaint.answers && selectedComplaint.answers.length > 0) {
      answerList.innerHTML = ''; // Cevap listesini temizle

      selectedComplaint.answers.forEach(function(answer) {
          const answerItem = document.createElement('li');
          answerItem.innerText = answer;
          answerList.appendChild(answerItem);
      });
      answerList.style.display = 'block';
  } else {
      answerList.innerHTML = '<li>Cevap bulunamadı.</li>';
      answerList.style.display = 'block';
  }
}


function showSearchResults(complaints) {
  const searchResults = document.getElementById('searchResults');

  if (!searchResults) {
    console.error('Arama sonuçları listesi bulunamadı.');
    return;
  }

  searchResults.innerHTML = ''; // Arama sonuçlarını temizle

  if (complaints.length === 0) {
    const noResults = document.createElement('p');
    noResults.textContent = 'Aranan kelimeye uygun şikayet bulunamadı.';
    searchResults.appendChild(noResults);
    return;
  }

  complaints.forEach(complaint => {
    const listItem = document.createElement('div');
    listItem.classList.add('complaint-item');
    listItem.innerHTML = `
      <strong>Şikayet Başlığı:</strong> ${complaint.title}<br>
      <strong>Şikayet Detayı:</strong> ${complaint.detail}<br>
      <strong>Firma:</strong> ${complaint.company}<br>
      <strong>Tarih:</strong> ${complaint.date}<br>
      <strong>Durum:</strong> ${complaint.status}<br>
      <button class="sbtn" onclick="showAnswer('${complaint.company}', '${complaint.title}')">Cevapları Göster</button>
      <ul id="answers_${complaint.title}" class="answer-list" style="display:none;"></ul>
    `;
    searchResults.appendChild(listItem);
  });
}


document.addEventListener('DOMContentLoaded', function() {
  const searchResults = JSON.parse(localStorage.getItem('searchResults'));

  if (searchResults) {
    showSearchResults(searchResults);
  } else {
  }

  // localStorage'daki arama sonuçlarını temizle
  localStorage.removeItem('searchResults');
});

document.getElementById('searchForm').addEventListener('submit', handleSearch);


function aramaYap(event) {
  event.preventDefault(); // Formun varsayılan gönderimini engelle

  const searchTerm = document.getElementById('searchInput').value.toLowerCase(); // Arama terimini al
  const allComplaints = loadComplaints(); // Tüm şikayetleri yükle

  // Örnek olarak, "complaints" adında bir dizi içine tüm şikayetleri yerleştiriyoruz
  const complaints = Object.values(allComplaints).flat();

  const filteredComplaints = complaints.filter(complaint =>
    Object.values(complaint).some(
      value => typeof value === 'string' && value.toLowerCase().includes(searchTerm)
    )
  );

  // Arama sonuçlarını localStorage'a kaydet
  localStorage.setItem('searchResults', JSON.stringify(filteredComplaints));
  
  // Arama sonuçlarını gösteren fonksiyonu çağırmak yerine, aramasonuc.html sayfasına yönlendir
  window.location.href = 'aramasonuc.html';
}

