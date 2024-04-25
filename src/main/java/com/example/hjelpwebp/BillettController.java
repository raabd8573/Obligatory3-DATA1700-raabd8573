package com.example.hjelpwebp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BillettController {

    @Autowired
    BillettRepository rep;

    @PostMapping("/lagre")
    public void lagreBillett(@RequestBody Billett innBillett) {
        System.out.println("Received billett: " + innBillett);
        rep.lagreBillett(innBillett);
    }

    @GetMapping("/hentAlle")
    public List<Billett> hentAlle() {
        return rep.hentAlleBillett();
    }

    @GetMapping("/slettAlle")
    public void slettAlle() {
        rep.slettAlleBilletter();
    }

    @GetMapping("/hentEnBillett")
    public ResponseEntity<Billett> hentEnBillett(@RequestParam Long id) {
        Billett billett = rep.hentBillett(id);
        if (billett != null) {
            return ResponseEntity.ok().body(billett);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/slettBillett")
    public ResponseEntity<Void> slettBillett(@RequestParam Long id) {
        Billett billett = rep.hentBillett(id);
        if (billett != null) {
            rep.slettBillett(id);
            return ResponseEntity.noContent().build(); // Return 204 No Content on successful deletion
        } else {
            return ResponseEntity.notFound().build(); // Return 404 Not Found if ticket with provided ID does not exist
        }
    }
}

