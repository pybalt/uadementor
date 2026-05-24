package com.adoo2.uadementor.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.adoo2.uadementor.auth.AuthenticationRequest;
import com.adoo2.uadementor.auth.AuthenticationResponse;
import com.adoo2.uadementor.auth.RegisterRequest;
import com.adoo2.uadementor.config.JwtService;
import com.adoo2.uadementor.model.Tutor;
import com.adoo2.uadementor.model.Alumno;
import com.adoo2.uadementor.repository.TutorRepository;
import com.adoo2.uadementor.repository.AlumnoRepository;
import com.adoo2.uadementor.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
        private final UsuarioRepository repository;
        private final AlumnoRepository alumnoRepository;
        private final TutorRepository tutorRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;

        public AuthenticationResponse register(RegisterRequest request) {
                if (request.getRole().equals("alumno")) {
                        var user = new Alumno(
                                        request.getNombre(),
                                        request.getApellido(),
                                        request.getDni(),
                                        request.getEmail(),
                                        passwordEncoder.encode(request.getPass()),
                                        request.getTelefono());

                        alumnoRepository.save(user);
                        var jwtToken = jwtService.generateToken(user);
                        return AuthenticationResponse.builder()
                                        .accessToken(jwtToken)
                                        .build();
                } else {
                        var user = new Tutor(
                                        request.getNombre(),
                                        request.getApellido(),
                                        request.getDni(),
                                        request.getEmail(),
                                        passwordEncoder.encode(request.getPass()),
                                        request.getTelefono());

                        tutorRepository.save(user);
                        var jwtToken = jwtService.generateToken(user);
                        return AuthenticationResponse.builder()
                                        .accessToken(jwtToken)
                                        .build();
}
        }

        public AuthenticationResponse authenticate(AuthenticationRequest request) {
                System.out.println(request.getEmail());
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()));
                System.out.println("Find by email");
                var user = repository.findByEmail(request.getEmail())
                                .orElseThrow();
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .accessToken(jwtToken)
                                .build();
        }
}


