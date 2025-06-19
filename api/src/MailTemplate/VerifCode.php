<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Votre code de vérification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #F7E9D7;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .logo {
            text-align: center;
            margin-bottom: 20px;
        }
        .logo img {
            max-width: 150px;
            height: auto;
        }
        h1 {
            color: #60171C;
            font-size: 24px;
            text-align: center;
            margin: 0 0 10px;
        }
        p {
            color: #333333;
            font-size: 16px;
            line-height: 1.5;
            margin: 10px 0;
        }
        .code-box {
            text-align: center;
            font-size: 32px;
            font-weight: bold;
            color: #60171C;
            padding: 15px;
            border: 2px dashed #60171C;
            border-radius: 6px;
            margin: 20px 0;
            letter-spacing: 4px;
            background-color: #F7E9D7;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #999999;
            margin-top: 20px;
        }
        @media only screen and (max-width: 480px) {
            .container {
                padding: 15px;
            }
            h1 {
                font-size: 20px;
            }
            .code-box {
                font-size: 26px;
                padding: 10px;
                letter-spacing: 2px;
            }
            p {
                font-size: 14px;
            }
            .logo img {
                max-width: 120px;
            }
        }
    </style>
</head>
<body>
<div class="container">
    <div class="logo">
        <img src="https://api.clink.test/uploads/clink_logo.webp" alt="Votre Logo">
    </div>
    <h1>Votre code de vérification</h1>
    <p>Bonjour,</p>
    <p>Voici votre code de vérification à 6 chiffres :</p>
    <div class="code-box">{{code}}</div>
    <p>Merci de saisir ce code dans l'application pour finaliser votre vérification.</p>
    <p>Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer ce message.</p>
    <div class="footer">
        &copy; 2025 Clink
    </div>
</div>
</body>
</html>
