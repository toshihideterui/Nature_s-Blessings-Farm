document.getElementById('confirm-btn').addEventListener('click', function() {
      var category = document.getElementById('category').value;
      var name = document.getElementById('name').value;
      var email = document.getElementById('email').value;
      var tel = document.getElementById('tel').value;
      var message = document.getElementById('message').value;
      if (!category) { alert('お問い合わせ種別を選択してください。'); return; }
      if (!name) { alert('お名前を入力してください。'); return; }
      if (!email) { alert('メールアドレスを入力してください。'); return; }
      if (!message) { alert('お問い合わせ内容を入力してください。'); return; }
      sessionStorage.setItem('contact_category', category);
      sessionStorage.setItem('contact_name', name);
      sessionStorage.setItem('contact_email', email);
      sessionStorage.setItem('contact_tel', tel);
      sessionStorage.setItem('contact_message', message);
      window.location.href = 'contact-confirm.html';
    });

window.addEventListener('DOMContentLoaded', function() {
      var category = sessionStorage.getItem('contact_category') || '';
      var name = sessionStorage.getItem('contact_name') || '';
      var email = sessionStorage.getItem('contact_email') || '';
      var tel = sessionStorage.getItem('contact_tel') || '';
      var message = sessionStorage.getItem('contact_message') || '';

      var categoryMap = {
        '1': '農園体験について',
        '2': '牧場見学について',
        '3': 'お仕事のご相談',
        '4': 'その他'
      };

      document.getElementById('val-category').textContent = categoryMap[category] || category || 'その他';
      document.getElementById('val-name').textContent = name || '山田太郎';
      document.getElementById('val-email').textContent = email || 'Tarou.yamada@gmail.com';
      document.getElementById('val-tel').textContent = tel || '080-1234-5678';
      document.getElementById('val-message').textContent = message || 'お問い合わせ内容が入ります。お問い合わせ内容が入ります。お問い合わせ内容が入ります。';
    });

$(document).ready(function () {
  
  // ------------------------------------
  // SP版 ハンバーガーメニュー
  // ------------------------------------
  $('.header__hamburger').on('click', function() {
    $('.sp-menu').addClass('is-open');
  });
  $('.sp-menu__close-btn').on('click', function() {
    $('.sp-menu').removeClass('is-open');
  });

  // ------------------------------------
  // スクロールアニメーション
  // ------------------------------------
  $(window).on('scroll', function () {
    // News欄の非表示
    const fv = $('.FV');
    if (fv.length) {
      const fvHeight = fv.outerHeight();
      const scrollPosition = $(window).scrollTop();
      const newsBox = $('.FV__chohoukei1111');
      if (scrollPosition > (fvHeight / 2)) {
        newsBox.addClass('is-hidden');
      } else {
        newsBox.removeClass('is-hidden');
      }
    }

    // nouen欄のフェードイン
    const nouenSection = $('.nouen');
    if (nouenSection.length) { 
      // アニメーションの発火条件チェック
      if (isElementInView(nouenSection) && !nouenSection.hasClass('animated')) {
        nouenSection.addClass('animated');
        const images = nouenSection.find('.nouen-fadein');
        images.each(function (index) {
          setTimeout(() => {
            $(this).addClass('is-visible');
          }, index * 500); // 0.5秒ごとに順番に表示
        });
      }
    }
  });

  // ------------------------------------
  // 活動紹介 (タブ + 複数スライダー)
  // ------------------------------------
  const mainSliders = $('.slider');
  
  if (mainSliders.length) {
    mainSliders.slick({ 
      autoplay: true,
      autoplaySpeed: 2000,
      speed: 800,
      dots: false,
      arrows: false,
      infinite: true,
      centerMode: true,  
      variableWidth: true, 
      slidesToShow: 1, 
      slidesToScroll: 1, 
      responsive: [
        {
          breakpoint: 768, 
          settings: {
            centerMode: true,
            variableWidth: true,
          }
        }
      ]
    });
  }

  const tabs = $('.syokai');
  const descriptions = $('.description-content');
  const sliders = $('.slider-container'); 
  
  if (tabs.length) {
    tabs.click(function () {
      tabs.removeClass("active");
      $(this).addClass("active");
      
      const targetId = $(this).data("target");
      const descTargetId = $(this).data("desc-target"); 

      descriptions.removeClass("active").hide();
      $("#" + descTargetId).addClass("active").show(); 

      sliders.removeClass("active").hide();
      $("#" + targetId).addClass("active").show();
      
      mainSliders.slick('setPosition'); 
    });

    tabs.first().addClass("active");
    sliders.first().addClass("active").show();
    descriptions.first().addClass("active").show();
  }

  // ------------------------------------
  // よくあるご質問 (アコーディオン)
  // ------------------------------------
  $('.question1q').on('click', function() {
    const answer = $(this).siblings('.question1a');
    const parent = $(this).parent('.question1');

    // 既に開いている場合（閉じる動作）
    if (parent.hasClass('is-open')) {
      answer.slideUp(300, function() {
        // アニメーションが終わってからクラスを外す（角を丸く戻す）
        parent.removeClass('is-open');
      });
    } 
    // 閉じている場合（開く動作）
    else {
      // クラスをつけてから（角を四角く変形させてから）開く
      parent.addClass('is-open');
      answer.slideDown(300);
    }
  });

  // ------------------------------------
  // ユーティリティ関数 (可視範囲チェック)
  // ------------------------------------
  function isElementInView(elem) {
    if (!elem.length) return false; 
    const docViewTop = $(window).scrollTop();
    const docViewBottom = docViewTop + $(window).height();
    const elemTop = $(elem).offset().top;
    
    // ★修正: 要素の頭が画面下から100px入ったら発火（以前は全体が入らないとダメだった）
    return (elemTop <= docViewBottom - 100);
  }
}