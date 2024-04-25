package com.example.hjelpwebp;

public class Billett {
    // Note: No need for id field in constructor for auto-incrementing primary key

    private int id; // This field will be auto-generated by the database
    private String film;
    private int antall; // Changed data type to int
    private String fornavn;
    private String etternavn;
    private String telefonnr; // Changed field name to match database
    private String epost;

    public Billett(){}

    // Constructor without id parameter
    public Billett(String film, int antall, String fornavn, String etternavn,
                   String telefonnr, String epost) {
        this.film = film;
        this.antall = antall;
        this.fornavn = fornavn;
        this.etternavn = etternavn;
        this.telefonnr = telefonnr;
        this.epost = epost;
    }

    // Getters and setters
    // Note: No setId method as id is auto-generated
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFilm() {
        return film;
    }

    public void setFilm(String film) {
        this.film = film;
    }

    public int getAntall() {
        return antall;
    }

    public void setAntall(int antall) {
        this.antall = antall;
    }

    public String getFornavn() {
        return fornavn;
    }

    public void setFornavn(String fornavn) {
        this.fornavn = fornavn;
    }

    public String getEtternavn() {
        return etternavn;
    }

    public void setEtternavn(String etternavn) {
        this.etternavn = etternavn;
    }

    public String getTelefonnr() {
        return telefonnr;
    }

    public void setTelefonnr(String telefonnr) {
        this.telefonnr = telefonnr;
    }

    public String getEpost() {
        return epost;
    }

    public void setEpost(String epost) {
        this.epost = epost;
    }
}