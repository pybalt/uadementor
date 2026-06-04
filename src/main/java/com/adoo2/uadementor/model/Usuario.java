package com.adoo2.uadementor.model;
import java.util.List;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.adoo2.uadementor.rest.dto.UsuarioAlumnoDTO;
import com.adoo2.uadementor.service.MedioRegistro;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Usuario implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String apellido;

    @Enumerated(EnumType.STRING)
    private Sexo sexo;

    private int dni;
    private String email;
    private String pass;
    private int telefono;
    private String role;

    @Lob
    private byte[] fotoPerfil;

    @OneToMany(mappedBy = "alumno")
    @JsonIgnore
    private List<SesionMentoria> historialSesiones;

    @OneToMany(mappedBy = "usuario")
    @JsonIgnore
    private List<Logro> logros;
    @Autowired
    @Transient
    private MedioRegistro medio;

    public Usuario(String nombre, String apellido, int dni, String email, String pass, int telefono) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.email = email;
        this.pass = pass;
        this.telefono = telefono;
    }

    public void agregarUsuario(Usuario usuario) {}

    public void eliminarUsuario(Usuario usuario) {}

    public void login(UsuarioAlumnoDTO usuarioDTO) {}

    public List<Logro> getListaLogros(){
        return logros;
    }

    public Long getId(){
        return id;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this instanceof Tutor) {
            return List.of(new SimpleGrantedAuthority("ROLE_TUTOR"));
        } else if (this instanceof Alumno) {
            return List.of(new SimpleGrantedAuthority("ROLE_ALUMNO"));
        } else {
            return List.of();
        }
    }

    public String getRole() {
        if (this instanceof Tutor) {
            return "tutor";
        } else if (this instanceof Alumno) {
            return "alumno";
        }
        return this.role;
    }

    @Override
    public String getPassword() {
        return this.pass;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}


