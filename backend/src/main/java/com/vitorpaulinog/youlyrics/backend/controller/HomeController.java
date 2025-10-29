package com.vitorpaulinog.youlyrics.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("")
public class HomeController {

    @GetMapping
    @PreAuthorize("authenticated()")
    public String home(@AuthenticationPrincipal OAuth2AuthenticatedPrincipal principal) {
        var email = principal.getAttribute("email");
        return "Hello, " + email;
    }

    @GetMapping("/test")
    @PreAuthorize("authenticated()")
    public String homeTest() {
        return "Hello";
    }
    
}
