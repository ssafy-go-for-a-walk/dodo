package com.ssafy.dodo.auth.jwt;

import com.nimbusds.jose.shaded.json.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Slf4j
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        // 유효한 자격증명을 제공하지 않고 접근하려 할 때, 401
        String exception = (String)request.getAttribute("exception");
        log.info("JwtAuthenticationEntryPoint : {}", exception);
    }

//    private void setResponse(HttpServletResponse response, ErrorCode code) throws IOException {
//        response.setContentType("application/json;charset=UTF-8");
//        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//
//        JSONObject responseJson = new JSONObject();
//        responseJson.put("message", code.getMessage());
//        responseJson.put("code", code.getStatus());
//
//        response.getWriter().print(responseJson);
//    }
}

