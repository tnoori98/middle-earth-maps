package com.example.backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.OptionalDouble;
import java.util.Properties;

@Service
public class MailService {
    private final JavaMailSender mailSender;

    private static String mailPassword;

    @Value("${spring.mail.password}")
    public void setMailPassword(String mailPassword) {
        MailService.mailPassword = mailPassword;
    }

    public static String getMailPassword() {
        return mailPassword;
    }

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public static void sendFeedback(String to, String subject, OptionalDouble averageRating) {
        String from = "noreply.middleearth.maps@gmail.com";
        String host = "smtp.gmail.com";
        Properties properties = System.getProperties();
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.required", "true");
        properties.put("mail.smtp.ssl.protocols", "TLSv1.2");

        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {

            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("noreply.middleearth.maps@gmail.com", getMailPassword());
            }
        });

        session.setDebug(true);

        try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(from));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            message.setSubject(subject);

            StringBuilder tableData = new StringBuilder();
            tableData.append("The average rating is ").append(averageRating.getAsDouble());

            message.setText(tableData.toString());

            System.out.println("sending...");
            Transport.send(message);
            System.out.println("Sent message successfully....");
        } catch (MessagingException mex) {
            mex.printStackTrace();
        }
    }

    public static void sendMail(String receiver, String subject, String content) throws MessagingException {
        String from = "noreply.middleearth.maps@gmail.com";
        String host = "smtp.gmail.com";
        Properties properties = System.getProperties();
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.required", "true");
        properties.put("mail.smtp.ssl.protocols", "TLSv1.2");

        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {

            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("noreply.middleearth.maps@gmail.com", getMailPassword());
            }
        });

        session.setDebug(true);

        try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(from));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(receiver));
            message.setSubject(subject);

            StringBuilder tableData = new StringBuilder();
            tableData.append(content);

            message.setContent(tableData.toString(), "text/html; charset=utf-8");

            System.out.println("sending...");
            Transport.send(message);
            System.out.println("Sent message successfully....");
        } catch (MessagingException mex) {
            mex.printStackTrace();
        }
    }
}
