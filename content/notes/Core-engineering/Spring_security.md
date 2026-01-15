# Spring Security

---

#### Various elements of security

![Alt](/img/Pasted_image_20250803194214.png)

### Spring security:

```groovy
<dependency>
<groupId>org.springframework.boot</groupId>
<artifactId>spring-boot-starter-security</artifactId>
</dependency>

```

![Alt](/img/Pasted_image_20250803195907.png)

### Effects:

![Alt](/img/Pasted_image_20250803200221.png)

By default spring will add the login form, add mandatory authentication for all paths, create a user to login. The security provided is by default session security.

#### Session based security and JWT based security:

![Alt](/img/Pasted_image_20250803201239.png)

![Alt](/img/Pasted_image_20250803201356.png)

| Feature          | Session-Based Security             | JWT-Based Security          |
| ---------------- | ---------------------------------- | --------------------------- |
| Storage          | Server-side                        | Client-side                 |
| Stateless        | ❌ No                               | ✅ Yes                       |
| Scalability      | 🟡 Needs extra infra (e.g., Redis) | ✅ Easily scalable           |
| Token revocation | ✅ Easy (delete from server)        | ❌ Hard (requires blacklist) |
| Token size       | Small (ID only)                    | Larger (contains payload)   |

#### Structure of JWT:

![Alt](/img/Pasted_image_20250803201543.png)

A token

```
eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZGlsQGdtYWlsLmNvbSIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE3NTQxNjMzNTgsImV4cCI6MTc1NDI0OTc1OH0.N_DHD02nNMBloFGBTrRiJUm_jBOvN3cu6XSkbZySasddyqSjDROjarQkZnBM3Xn2Ct28ILd7C8uCAkSI9TlMZw

```

```
0123456789012345678901234567890123456789012345678901234567890123

```

![Alt](/img/Pasted_image_20250803202350.png)

### Configuring spring security for JWT:

![Alt](/img/Pasted_image_20250803203006.png)

### Main entities:

1. Config
2. Custom filter
3. Authentication manager
4. JWT utils

```java
@EnableWebFluxSecurity
public class SecurityConfig {
    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http){
        return http
        .csrf(ServerHttpSecurity.CsrfSpec::disable)
        .authorizeExchange(exchanges -> exchanges
        .pathMatchers("/api/v1/auth/login").permitAll()
        .pathMatchers("/api/v1/user/**").hasRole("USER")
        .pathMatchers("/api/v1/admin/**").hasRole("ADMIN")
        .anyExchange()
        .authenticated())
        .addFilterBefore(JWTFilter)
        .build();
    }
}

```

```java
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private CustomUserDetailService userDetailsService;
    @Autowired
    private TokenBlacklist tokenBlacklist;
    @Override
    protected void doFilterInternal(HttpServletRequest request,HttpServletResponse response,FilterChain filterChain)throws ServletException, IOException {
        String path = request.getServletPath();
        if (path.equals("/login") || path.equals("/register") || path.equals("/home") || path.equals("/app-logout")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = jwtUtil.resolveToken(request);

        if (Objects.isNull(token)) {
            filterChain.doFilter(request, response);
            return;
        }

        if (jwtUtil.isTokenRevoked(token)) {
            System.out.println("Token revoked");
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.getWriter().write("Token has been invalidated");
            return;
        }

        String username = jwtUtil.extractUsername(token);
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails =
            userDetailsService.loadUserByUsername(username);
            if (userDetails !=null && jwtUtil.validateToken(token)) {
                UsernamePasswordAuthenticationToken authToken = new
                UsernamePasswordAuthenticationToken(username,userDetails.getPassword(), userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}

```

```java
public String login(@RequestBody AuthRequest authRequest){
    Authentication authentication =  authManager.authenticate(new UsernamePasswordAuthenticationToken(
    authRequest.username(), authRequest.password()));
    if(authentication.isAuthenticated()){
        return jwtUtil
        .generateToken(userDetailService.
        loadUserByUsername(authRequest.username()));
    }
    else{
        throw new UsernameNotFoundException("Invalid Credential");
    }
}

```

```java
@RequestMapping("/register")
public class RegistrationController {
    @Autowired
    private UserRepository repository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return new ResponseEntity<>(repository.save(user), HttpStatus.CREATED);
    }
}

```

```java
public String generateToken(UserDetails userDetails){
    return Jwts.builder()
    .subject(userDetails.getUsername())
    .issuedAt(Date.from(Instant.now()))
    .expiration(Date.from(Instant.now().plusMillis(EXPIRATION_TIME)))
    .signWith(key)
    .compact();
}

```

```java
@Bean
public AuthenticationProvider authenticationProvider() {
    var provider = new org.springframework.security.authentication.dao.DaoAuthenticationProvider();
    provider.setUserDetailsService(userDetailsService);
    return provider;
}

@Bean
public AuthenticationManager authenticationManager(AuthenticationProvider provider) {
    return new ProviderManager(provider);
}

```

Database:

1. Indexing
2. EXPLAIN

Java:
1. Java 8 features
2. Spring --
3. Spring boot --

Docker:
1. Docker logs
2. container
3. volume
4. network
5. image

React:
1. useEffect():
2.
