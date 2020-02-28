<?php
$api = [
    'key' => '3090',
    'secret' => '1ee0d1ae1eb9d4aad458e1c4e623d049',
    'flow_url' => 'https://leadrock.com/URL-5467F-18956'
];

function send_the_order($post, $api)
{
    $params = [
        'flow_url' => $api['flow_url'],
        'user_phone' => $post['phone'],
        'user_name' => $post['name'],
        'other' => $post['other'],
        'ip' => $_SERVER['REMOTE_ADDR'],
        'ua' => $_SERVER['HTTP_USER_AGENT'],
        'api_key' => $api['key'],
        'sub1' => $post['sub1'],
        'sub2' => $post['sub2'],
        'sub3' => $post['sub3'],
        'sub4' => $post['sub4'],
        'sub5' => $post['sub5'],
        'ajax' => 1,
    ];
    $url = 'https://leadrock.com/api/v2/lead/save';

    $trackUrl = $params['flow_url'] . (strpos($params['flow_url'], '?') === false ? '?' : '&') . http_build_query($params);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $trackUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
    $params['track_id'] = curl_exec($ch);

    $params['sign'] = sha1(http_build_query($params) . $api['secret']);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
    curl_exec($ch);
    curl_close($ch);

    header('Location: ' . (empty($post['success_page']) ? 'confirm.html' : $post['success_page']));
}

if (!empty($_POST['phone'])) {
    send_the_order($_REQUEST, $api);
}

if (!empty($_GET)) {
?>
    <script type="text/javascript">
        window.onload = function() {
            let forms = document.getElementsByTagName("form");
            for(let i=0; i<forms.length; i++) {
                let form = forms[i];
                form.setAttribute('action', form.getAttribute('action') + "?<?php echo http_build_query($_GET)?>");
                form.setAttribute('method', 'post');
            }
        };
    </script>
<?php
}

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Geacă tactică militară pentru activități în aer liber</title>

    <meta name="description" content="Outdoors Military Tactical Jacket" />

    <!-- 只在详情页和列表页展示-->
    <meta
      property="og:image"
      content="imgf5754c32fb5a57d3acea3d4dc38fdb1404f78043.png"
    />
    <meta
      property="og:image:secure_url"
      content="imgf5754c32fb5a57d3acea3d4dc38fdb1404f78043.png"
    />
    <meta
      name="twitter:image"
      content="imgf5754c32fb5a57d3acea3d4dc38fdb1404f78043.png"
    />

    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0"
    />
    <meta name="applicable-device" content="mobile" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta
      name="apple-mobile-web-app-status-bar-style"
      content="black-translucent"
    />
    <meta name="format-detection" content="telephone=no" />
    <meta name="apple-mobile-web-app-title" content="Lama Join" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="renderer" content="webkit" />
    <meta name="aplus-terminal" content="1" />
    <meta name="format-detection" content="telephone=no, email=no" />
    <link
      rel="icon"
      href="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="
      type="image/x-icon"
    />
    <script type="text/javascript" src="js/init.js"></script>
    <script type="text/javascript" src="js/jquery.js"></script>

    <link rel="stylesheet" href="css/template1.comm.min.css" />
    <link rel="stylesheet" href="css/styles.min.css" />
    <style type="text/css">


      .sl-main-title,
      .sl-main-title a {
        font-family: OpenSansRegular !important;
        font-size: 28px !important;
        line-height: 32px !important;
      }

      .banner .sl-main-title {
        font-size: 48px !important;
        line-height: 52px !important;
      }

      .sl-subhead-title,
      .sl-subhead-title a {
        font-family: Arial, Helvetica, sans-serif !important;
      }

      body,
      input,
      .product-details * {
        font-family: Arial, Helvetica, sans-serif !important;
        font-size: 16px !important;
      }
    </style>
  </head>

  <body class="template1-body">
          <div class="form-wrap" id="order-form">
              <h2 class="form__title">COMPLETATI FORMULARUL</h2>
            <form action="" class="form" method="POST">
                <div class="fields">
                    <label for="">De exemplu: Adrian Rimane</label>
                    <input type="text" name="name" placeholder="Numele Dvs." required="">
                </div>
                <div class="fields">
                    <label for="">De exemplu: +40 777999888</label>
                    <input type="tel" name="phone" placeholder="Numărul Dvs. De telefon" required="">
                </div>
                <button type="submit" class="mk-button">Rezervă acum</button>
            </form>
          </div>
        </div>

        <!-- 快捷加购按钮 -->
        <div class="model-add-to-cart J-modelAddToCart">
          <div class="main">
            <div class="flex-left">
              <div class="product-img">
                <img src="outdoors-military-tactical-jacket.html" />
              </div>
              <div>
               
                <p class="attribute"></p>
              </div>
            </div>
            <div class="flex-right">
              <p class="price">
                <span class="visually-hidden" aria-hidden="false"
                  >Preț redus</span
                >
                <span
                  class="pay-price sl-subhead-title"
                  data-seller-price="239"
                  data-price="239"
                >
                  39,98 Ron Ron
                </span>

                <span class="visually-hidden" aria-hidden="false"
                  >Preț obișnuit</span
                >
                <span
                  class="orig-price sl-subhead-title"
                  data-seller-price="340"
                  data-price="340"
                >
                  98,96 Ron Ron
                </span>
              </p>
            </div>
          </div>
        </div>

      </div>
      
      <script type="text/javascript" src="js/Swiper.js"></script>
      <script type="text/javascript" src="js/jhPlugin.js"></script>
      <script type="text/javascript" src="js/index.js"></script>
      <script src="js/call-back.js"></script>
    </div>
  <script type="text/javascript" src="https://cdn.ldrock.com/validator.js"></script>
<script type="text/javascript">
    LeadrockValidator.init({
        geo: {
            iso_code: 'RO'
        }
    });
</script>
</body>
</html>
