package com.ssafy.dodo.auth.jwt;

import com.ssafy.dodo.auth.CustomOAuth2User;
import com.ssafy.dodo.exception.ErrorCode;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
@Slf4j
public class JwtProvider {

    private final String SECRET_KEY;
    private static final Long ACCESS_TOKEN_VALIDATE_TIME = 1000L * 60 * 60 * 24 * 5;
    public static final Long REFRESH_TOKEN_VALIDATE_TIME = 1000L * 60 * 60 * 24 * 7;
    private final String AUTHORITIES_KEY = "role";

    public JwtProvider(@Value("${app.auth.jwt.secret-key}") String secretKey) {
        this.SECRET_KEY = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createAccessToken(Authentication authentication) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + ACCESS_TOKEN_VALIDATE_TIME);

        Long seq;
        if(authentication.getPrincipal() instanceof CustomOAuth2User){
            seq = ((CustomOAuth2User)authentication.getPrincipal()).getSeq();
        }else{
            seq = Long.parseLong(((org.springframework.security.core.userdetails.User) authentication.getPrincipal()).getUsername());
        }

//        try{
//            seq = ((CustomOAuth2User)authentication.getPrincipal()).getSeq();
//        }catch (Exception e){
//            seq = Long.parseLong(((org.springframework.security.core.userdetails.User) authentication.getPrincipal()).getUsername());
//        }

        Map<String, Object> claims = new HashMap<>();
        claims.put(AUTHORITIES_KEY, "ROLE_USER");
        claims.put("userSeq", seq);

        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .setClaims(claims)
//                .setAudience(email)
                .setSubject(seq.toString())
                .setIssuer("issuer")
                .setIssuedAt(now)
                .setExpiration(validity)
                .compact();
    }

    public String createRefreshToken(Authentication authentication) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + REFRESH_TOKEN_VALIDATE_TIME);

        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .claim(AUTHORITIES_KEY, "ROLE_USER")
                .setIssuer("issuer")
                .setIssuedAt(now)
                .setExpiration(validity)
                .compact();
    }

    public Authentication getAuthentication(String accessToken) {
        Claims claims = parseClaims(accessToken);

        String seq = ((Map<String, Object>) claims).get("userSeq").toString();

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new).collect(Collectors.toList());

        User principal = new User(seq, "", authorities);

        // principal CustomOAuth2User로 만들수없을까
//        CustomOAuth2User principal2 = new CustomOAuth2User(Long.parseLong(seq), claims.getAudience());

        return new UsernamePasswordAuthenticationToken(principal, accessToken, authorities);
    }

    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    public boolean validateToken(String token) {
        Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
        return true;
    }
}
