package com.vitorpaulinog.youlyrics.backend.core.security;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import com.vitorpaulinog.youlyrics.backend.domain.entity.User;
import lombok.Data;

@Data
public class OAuth2LoggedUser implements OAuth2AuthenticatedPrincipal {

    private User user;

	private final Collection<GrantedAuthority> authorities;
    private final Map<String, Object> attributes;
    
    public OAuth2LoggedUser(
        Map<String, Object> attributes,
        Collection<GrantedAuthority> authorities,
        User user
    ) {
		this.user = user;
        this.attributes = Collections.unmodifiableMap(attributes);
		this.authorities = (authorities != null) ? Collections.unmodifiableCollection(authorities)
				: AuthorityUtils.NO_AUTHORITIES;
	}


    @Override
    public String getName() {
        return user.getEmail();
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

}
