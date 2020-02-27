<?php
$api = [
    'key' => '3090',
    'secret' => '1ee0d1ae1eb9d4aad458e1c4e623d049',
    'flow_url' => 'https://leadrock.com/URL-XXXXX-XXXXX'
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
<html lang="RO">
  <head>
    <script src="js/jquery.min.js"></script>
    <script src="js/timer.min.js"></script>
    <title>Geaca pentru orice vreme Tactical Jacket</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=480" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <meta
      name="description"
      content="Acest model a fost conceput special pentru persoanele active care petrec mult timp în aer liber. Ploaia, zăpada, vântul și, de asemenea, soarele cald - în orice vreme în Tactical Jacket vă veți simți la fel de confortabil. "
    />
    <link
      rel="shortcut icon"
      href="/assets_page/7553a73873b7de9c88d735b9f7362fa3281c3034/favicon.png"
      type="image/x-icon"
    />
    <link rel="stylesheet" type="text/css" href="css/reset.css" />
    <link rel="stylesheet" type="text/css" href="css/AvenirNextCyr.css" />
    <link rel="stylesheet" type="text/css" href="css/fontawesome.min.css">
    <link rel="stylesheet" type="text/css" href="css/owl.carousel.min.css" />
    <link rel="stylesheet" type="text/css" href="css/styles.css" />
  </head>
  <body>
    <div class="main_wrapper">

      <section class="offer_section offer3">
        <form method="POST" action="" id="order_form">
          <label for="name2">De exemplu: Illarion Antonov</label>
          <input
            id="name2"
            type="text"
            name="name"
            placeholder="Numele dumneavoastră"
            required=""
          />
          <label for="phone2">De exemplu: +409218765432</label>
          <input
            id="phone2"
            type="tel"
            name="phone"
            placeholder="Număr de telefon"
            required=""
          />
          <button type="submit" class="button">Rezervă acum</button>
        </form>
    <script>
      $(".callback-btn").click(function() {
        $(".callback-form").toggleClass("hide");
      });

      $(".show-callback").click(function() {
        $(".callback-form").removeClass("hide");
      });

      $(document).click(function(e) {
        if (
          $(e.target).closest(
            $(".callback-form, .callback-btn, .show-callback")
          ).length > 0
        ) {
          return;
        }
        $(".callback-form").addClass("hide");
      });

      $('img[src="img/i-cross.svg"]').click(function() {
        $(".callback-form").addClass("hide");
      });
    </script>
    <!-- scripts -->
    <link type="text/css" rel="stylesheet" href="css/roboto.css" />

    <script src="js/owl.carousel.min.js"></script>
    <script src="js/scripts.js"></script>
    <!-- /scripts -->
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
