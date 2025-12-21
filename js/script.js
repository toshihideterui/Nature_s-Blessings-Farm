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
});