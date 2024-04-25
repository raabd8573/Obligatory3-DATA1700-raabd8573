package com.example.hjelpwebp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


import java.util.Collections;
import java.util.Comparator;
import java.util.List;


@Repository
public class BillettRepository {
    @Autowired
    private JdbcTemplate db;

    public void lagreBillett(Billett billett) {
        String sql = "INSERT INTO Billett (film, antall, fornavn, etternavn, telefonnr, epost) VALUES (?, ?, ?, ?, ?, ?)";
        db.update(sql, billett.getFilm(), billett.getAntall(), billett.getFornavn(),
                billett.getEtternavn(), billett.getTelefonnr(), billett.getEpost());
    }

    public List<Billett> hentAlleBillett() {
        String sql = "SELECT * FROM Billett";
        List<Billett> alleBillett = db.query(sql, new BeanPropertyRowMapper<>(Billett.class));
        Collections.sort(alleBillett, Comparator.comparing(Billett::getEtternavn));
        return alleBillett;
    }

    public void slettAlleBilletter() {
        String sql = "DELETE FROM Billett";
        db.update(sql);
    }

    public Billett hentBillett(Long id) {
        String sql = "SELECT * FROM Billett WHERE id = ?";
        return db.queryForObject(sql, new BeanPropertyRowMapper<>(Billett.class), id);
    }

    public void slettBillett(Long id) {
        String sql = "DELETE FROM Billett WHERE id = ?";
        db.update(sql, id);
    }

}