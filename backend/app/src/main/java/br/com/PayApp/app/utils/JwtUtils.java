//package br.com.PayApp.app.utils;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
//import java.util.Date;
//import java.util.function.Function;
//
//@Component
//public class JwtUtils {
//
//    @Value("${jwt.secret}")
//    private String secret;
//
//    @Value("${jwt.expiration}")
//    private long expirationInMillis;
//
//    public String generateToken(String username) {
//        if (username == null) {
//            throw new IllegalArgumentException("UserDetails cannot be null or empty");
//        }
//
//        return Jwts.builder()
//                .setSubject(username)
//                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis() + expirationInMillis))
//                .signWith(SignatureAlgorithm.HS256, secret)
//                .compact();
//    }
//
//    public String getUsernameFromToken(String token) {
//        if (token == null || token.isEmpty()) {
//            throw new IllegalArgumentException("JWT String argument cannot be null or empty.");
//        }
//        return getClaimFromToken(token, Claims::getSubject);
//    }
//
//    public boolean isTokenExpired(String token) {
//        return getClaimFromToken(token, Claims::getExpiration).before(new Date());
//    }
//
//    public boolean validateToken(String token, String username) {
//        return getUsernameFromToken(token).equals(username) && !isTokenExpired(token);
//    }
//
//    private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
//        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
//        return claimsResolver.apply(claims);
//    }
//}