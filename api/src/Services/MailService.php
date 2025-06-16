<?php

namespace App\Services;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class MailService {
    private PHPMailer $mailer;
    public function __construct()
    {
        $this->mailer = new PHPMailer(true);
        $this->mailer->SMTPDebug = 0;
        $this->mailer->isSMTP();
        $this->mailer->CharSet = 'UTF-8';
        $this->mailer->Host = $_ENV['MAIL_SMTP_HOST'];
        $this->mailer->SMTPAuth = boolval($_ENV['MAIL_SMTP_AUTH']);
        $this->mailer->Username = $_ENV['MAIL_SMTP_USER'];
        $this->mailer->Password = $_ENV['MAIL_SMTP_PASS'];
        $this->mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $this->mailer->Port = $_ENV['MAIL_SMTP_PORT'];
        $this->mailer->setFrom($_ENV['MAIL_SMTP_USER'], "CLink");
    }
    public function send_to(string $email, string $name = '') :void {
        $this->mailer->addAddress($email, $name);
    }
    public function add_subject(string $subject) :void
    {
        $this->mailer->Subject = $subject;
    }
    public function set_body(string $templateName, array $data) :void
    {
        $templatePath = realpath(TEMPLATE_DIRECTORY . $templateName);

        if (!$templatePath || !file_exists($templatePath)) {
            throw new \Exception("Template introuvable : " . $templatePath);
        }

        $email_body = file_get_contents($templatePath);

        foreach ($data as $key => $value) {
            $email_body = str_replace('{{' . $key . '}}', htmlspecialchars($value, ENT_QUOTES, 'UTF-8'), $email_body);
        }

        $this->mailer->isHTML(true);
        $this->mailer->Body = $email_body;

    }
    public function send_mail() :void
    {
        try {
            $this->mailer->send();
        } catch (Exception $e) {
            echo 'Erreur lors de l\'envoi de l\'email : ' . $e->getMessage();
        }
    }
}