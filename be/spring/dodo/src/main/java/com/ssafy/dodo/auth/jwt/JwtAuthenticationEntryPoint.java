package com.ssafy.dodo.auth.jwt;

import com.nimbusds.jose.shaded.json.JSONObject;
import com.ssafy.dodo.exception.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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
//        response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        ErrorCode exception = (ErrorCode) request.getAttribute("exception");
//        log.info(exception);
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        JSONObject responseJson = new JSONObject();
        responseJson.put("code", HttpStatus.UNAUTHORIZED.value());
        responseJson.put("message", exception);

        response.getWriter().write(String.valueOf(responseJson));
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

