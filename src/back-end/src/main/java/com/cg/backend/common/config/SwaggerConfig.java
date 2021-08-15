package com.cg.backend.common.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Parameter;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Value("${spring.swagger2.enabled}")
    private Boolean swaggerEnabled;

    private ApiInfo apiInfo(){
        return new ApiInfoBuilder()
                .title("API Documentation")
                .description("cg General WebSite")
                .termsOfServiceUrl("https://www.cg.com")
                .version("1.0")
                .build();
    }

    @Bean
    public Docket CreatRestApi(){
        List<Parameter> parameters = new ArrayList<>();
        parameters.add(new ParameterBuilder()
                .name("Access-Token")
                .description("Authorization token")
                .modelRef(new ModelRef("string"))
                .parameterType("header")
                .required(false)
                .build());
        parameters.add(new ParameterBuilder()
                .name("Email")
                .description("Email address")
                .modelRef(new ModelRef("string"))
                .parameterType("header")
                .required(false)
                .build());
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .enable(swaggerEnabled)
                .globalOperationParameters(parameters)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.cg.backend"))
                .paths(PathSelectors.any())
                .build();

    }
}
