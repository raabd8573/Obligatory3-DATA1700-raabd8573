$(function() {
    // Attach form submission event handler
    $("form").submit(function(event) {
        // Prevent default form submission behavior
        event.preventDefault();

        // Call function to register billett
        regbillett();
    });

    // Call function to retrieve all billett records
    hentAlle();
});

function regbillett() {
    const billett = {
        film: $("#film").val(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefonnr: $("#telefonnr").val(),
        epost: $("#epost").val(),
    }

    // Validate billett data
    if (validerBillett(billett)) {
        $.post({
            url: "/lagre",
            contentType: "application/json",
            data: JSON.stringify(billett),
            success: function () {
                hentAlle();
            }
        });
        $("#film").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");
    } else {
        // Display error message if billett data is not valid
        $("#utBillett").html("Fyll ut alle felter og rett alle feil i skjemaet før innsending");
    }
}

// Function to retrieve all billett records
function hentAlle() {
    $.get("/hentAlle", function(billett) {
        // Format and display billett records
        formaterBillett(billett);
    });
}
function formaterBillett(billett) {
    let ut = "<table class='table table-striped'><tr>" +
        "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th><th>Handling</th>" +
        "</tr>";
    for (const b of billett) {
        ut += "<tr><td>" + b.film + "</td><td>" + b.antall + "</td><td>" +
            b.fornavn + "</td><td>" + b.etternavn + "</td><td>" + b.telefonnr +
            "</td><td>" + b.epost + "</td><td>" +
            "<button class='btn btn-danger' onclick='slettBillett(" + b.id + ")'>Slett</button>" + "</td>" ;
    }
    ut += "</table>";
    $("#utBillett").html(ut);
}

function redigerBillett(id) {
    // Retrieve the ticket data based on the provided ID
    $.get("/hentEnBillett?id=" + id, function(billett) {
        // Log the retrieved ID
        console.log("Retrieved ID:", id);

        // Replace the values in the form fields with the ticket data for editing
        $("#film").val(billett.film);
        $("#antall").val(billett.antall);
        $("#fornavn").val(billett.fornavn);
        $("#etternavn").val(billett.etternavn);
        $("#telefonnr").val(billett.telefonnr);
        $("#epost").val(billett.epost);

        // Scroll to the top of the form for better user experience
        $("html, body").animate({ scrollTop: $("#film").offset().top }, 500);

        // Change the click event of the "Kjøp billett" button to call the oppdaterBillett function
        const $btn = $(".btn-primary");
        if ($btn.text() !== "Oppdater") {
            $btn.unbind("click").click(function() {
                oppdaterBillett($("#film").attr("data-id")); // Pass the ID here
            }).text("Oppdater");
        }
    });
}

function slettBillett(id) {
    $.ajax({
        url: "/slettBillett?id=" + id,
        type: "DELETE",
        success: function () {
            hentAlle(); // After successful deletion, retrieve and display all tickets
        }
    });
}

// Function to delete all billett records
function slettAlle() {
    $.get("/slettAlle", function() {
        // After successful deletion, retrieve and display all billett records
        hentAlle();
    });
}

// Function to validate billett data
function validerBillett(billett) {
    // Validate film field
    const filmOK = validerFilm(billett.film);
    // Validate antall field
    const antallOK = validerAntall(billett.antall);
    // Validate fornavn field
    const fornavnOK = validerFornavn(billett.fornavn);
    // Validate etternavn field
    const etternavnOK = validerEtternavn(billett.etternavn);
    // Validate telefonnr field
    const telefonnrOK = validerTelefon(billett.telefonnr);
    // Validate epost field
    const epostOK = validerEpost(billett.epost);

    // Return true if all fields are valid, otherwise return false
    return filmOK && antallOK && fornavnOK && etternavnOK && telefonnrOK && epostOK;
}

// Function to validate film field
function validerFilm(film) {
    if (film) {
        $("#feilFilm").html("");
        return true;
    } else {
        $("#feilFilm").html("Velg film");
        return false;
    }
}

// Function to validate antall field
function validerAntall(antall) {
    const regex = /^[1-9]\d*$/;
    if (regex.test(antall)) {
        $("#feilAntall").html("");
        return true;
    } else {
        $("#feilAntall").html("Kun bruk heltall");
        return false;
    }
}

// Function to validate fornavn field
function validerFornavn(fornavn) {
    const regex = /^[A-ZÆØÅa-zæøå]{2,50}/;
    if (regex.test(fornavn)) {
        $("#feilFornavn").html("");
        return true;
    } else {
        $("#feilFornavn").html("Bruk kun store og små bokstaver, -og mellomrom");
        return false;
    }
}

// Function to validate etternavn field
function validerEtternavn(etternavn) {
    const regex = /^[A-ZÆØÅa-zæøå]{2,50}/;
    if (regex.test(etternavn)) {
        $("#feilEtternavn").html("");
        return true;
    } else {
        $("#feilEtternavn").html("Bruk kun store og små bokstaver, -og mellomrom");
        return false;
    }
}

// Function to validate telefonnr field
function validerTelefon(telefon) {
    const regex = /^[1-9]{8}$/;
    if (regex.test(telefon)) {
        $("#feilTelefonnr").html("");
        return true;
    } else {
        $("#feilTelefonnr").html("Skriv inn telefonnr");
        return false;
    }
}

// Function to validate epost field
function validerEpost(epost) {
    const regex = /^[A-Za-z0-9._%+/-]+@[A-Za-z0-9./-]+\.[A-Za-z]{2,}$/;
    if (regex.test(epost)) {
        $("#feilEpost").html("");
        return true;
    } else {
        $("#feilEpost").html("Skriv inn epost");
        return false;
    }
}
