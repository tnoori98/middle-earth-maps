package com.example.backend.services;

import com.example.backend.dto.request.LoginRequestDto;
import com.example.backend.dto.request.RegistrationRequestDto;
import com.example.backend.dto.request.UserRequestDto;
import com.example.backend.dto.response.LoginResponseDto;
import com.example.backend.dto.response.RegistrationResponseDto;
import com.example.backend.dto.response.UpdateFractionResponseDto;
import com.example.backend.dto.response.UserResponseDto;
import com.example.backend.models.FractionEnum;
import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.security.BCryptPasswordHelper;
import com.example.backend.security.JwtService;
import com.github.dozermapper.core.Mapper;
import com.sendgrid.helpers.mail.Mail;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.Optional;
import java.util.UUID;


/**
 * User relevant business logic for the user entity
 */

@Service
public class UserService {
    private final UserRepository userRepository;
    private final Mapper mapper;
    private final BCryptPasswordHelper bCryptPasswordHelper;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository, Mapper mapper, BCryptPasswordHelper bCryptPasswordHelper, AuthenticationManager authenticationManager, JwtService jwtService){
        this.userRepository = userRepository;
        this.mapper = mapper;
        this.bCryptPasswordHelper = bCryptPasswordHelper;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public RegistrationResponseDto registerUser(RegistrationRequestDto registrationRequest) {
        boolean userExists = userRepository.existsByUsernameOrEmail(registrationRequest.getUsername(), registrationRequest.getEmail());

        if (userExists) {
            return null;
        }

        String randomSalt = UUID.randomUUID().toString();
        String hashedPassword = bCryptPasswordHelper.getSHA512SecurePassword(registrationRequest.getPassword(), randomSalt);

        User dbUser = new User();
        mapper.map(registrationRequest, dbUser);

        dbUser.setHash(hashedPassword);
        dbUser.setSalt(randomSalt);
        dbUser.setFraction(FractionEnum.DEFAULT);

        userRepository.save(dbUser);

        RegistrationResponseDto registrationResponse = new RegistrationResponseDto();
        mapper.map(dbUser, registrationResponse);

        return registrationResponse;
    }

    public LoginResponseDto authenticateUser(LoginRequestDto loginRequestDto) {
        User dbUser = userRepository.getUserByUsername(loginRequestDto.getUsername());

        if (dbUser == null) {
            return null;
        }

        String hashedPassword = bCryptPasswordHelper.getSHA512SecurePassword(loginRequestDto.getPassword(), dbUser.getSalt());

        if (!hashedPassword.equals(dbUser.getHash())) {
            return null;
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDto.getUsername(), loginRequestDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = this.jwtService.generateJwtToken(authentication, dbUser.getFraction());

        return new LoginResponseDto(jwt);
    }

    public UserResponseDto updateUserCredentials(UserRequestDto userRequestDto, String usernameOld, String jwtToken){
        User user = userRepository.getUserByUsername(usernameOld);

        if(user==null){
            return null;
        }

        if(userRequestDto.getPassword() != null & userRequestDto.getPassword() != "") {
            String hashedPassword = bCryptPasswordHelper.getSHA512SecurePassword(userRequestDto.getPassword(), user.getSalt());
            user.setHash(hashedPassword);
        }

        if(userRequestDto.getUsername() != null & userRequestDto.getUsername() != ""){
            boolean userUsernameExists = userRepository.existsByUsername(userRequestDto.getUsername());
            if(userUsernameExists){
                return null;
            }
            user.setUsername(userRequestDto.getUsername());
        }

        if(userRequestDto.getEmail() != null & userRequestDto.getEmail() != ""){
            boolean userEmailExists = userRepository.existsByEmail(userRequestDto.getEmail());
            if(userEmailExists){
                return null;
            }
            user.setEmail(userRequestDto.getEmail());
        }

        jwtService.blacklistJwt(jwtToken);
        userRepository.save(user);

        String jwt = this.jwtService.generateNewJwtToken(user);

        return new UserResponseDto(jwt);
    }

    public UpdateFractionResponseDto updateUserFraction(String username, FractionEnum fraction){
        User user = userRepository.getUserByUsername(username);

        if (user.getFraction() != FractionEnum.DEFAULT) {
            return null;
        }

        user.setFraction(fraction);
        userRepository.save(user);

        String jwt = this.jwtService.generateNewJwtToken(user);

        return new UpdateFractionResponseDto(jwt);
    }

    public void deleteAccount(String username, String jwt) {
        User user = userRepository.getUserByUsername(username);
        jwtService.blacklistJwt(jwt);
        userRepository.delete(user);
    }

    public void requestPasswordActivationLink(String email) {
        Optional<User> optionalUser = userRepository.findUserByEmail(email);

        if (optionalUser.isEmpty() || !optionalUser.isPresent()) {
            return;
        }

        var resetPasswordJwtToken = jwtService.generatePasswordResetJwtToken(email);

        try {
            String content = "http://localhost:3000/resetPassword/" + resetPasswordJwtToken;
            MailService.sendMail(email, "[Middle Earth Maps] Password change request!",
                    "<!DOCTYPE html>\n" +
                            "<html>\n" +
                            "    <head>\n" +
                            "        <link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\" integrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T\" crossorigin=\"anonymous\">\n" +
                            "        <script src=\"https://code.jquery.com/jquery-3.3.1.slim.min.js\" integrity=\"sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo\" crossorigin=\"anonymous\"></script>\n" +
                            "        <script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js\" integrity=\"sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1\" crossorigin=\"anonymous\"></script>\n" +
                            "        <script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js\" integrity=\"sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM\" crossorigin=\"anonymous\"></script>\n" +
                            "    </head>\n" +
                            "    <body>\n" +
                            "        <h2>Hey, Gandalf here!</h2>\n" +
                            "        <p>\n" +
                            "            I've received a change request of your secret word.<br>\n" +
                            "            The one link will expire in 24 hours. If you did not request a change, chances are high Gollum did it to troll you - please ignore this email, no changes will be made to your account.<br>\n" +
                            "        </p>\n" +
                            "        <a href=\n" + content + ">Reset secret word</a>" +
                            "    </body>\n" +
                            "</html>");
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public void updateUserPassword(String email, String newPassword){
        Optional<User> optionalUser = userRepository.findUserByEmail(email);

        if(optionalUser.isEmpty() || !optionalUser.isPresent()) {
            return;
        }

        String randomSalt = UUID.randomUUID().toString();
        String hashedPassword = bCryptPasswordHelper.getSHA512SecurePassword(newPassword, randomSalt);

        User dbUser = optionalUser.get();
        dbUser.setHash(hashedPassword);
        dbUser.setSalt(randomSalt);
        userRepository.save(dbUser);
    }

}
