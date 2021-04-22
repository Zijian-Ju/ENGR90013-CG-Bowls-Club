package com.cg.backend.common.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Value("${spring.swagger2.enabled}")
    private Boolean swaggerEnabled;

    private ApiInfo apiInfo(){
        return new ApiInfoBuilder()
                .title("API Documentation")
                .description("Mengsoft General WebSite")
                .termsOfServiceUrl("https://www.mengsoft.com")
                .version("1.0")
                .build();
    }

    @Bean
    public Docket CreatRestApi(){
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .enable(swaggerEnabled)
                .select()
                .apis(RequestHandlerSelectors.basePackage("org.mengsoft.webbackend"))
                .paths(PathSelectors.any())
                .build();

    }
}
