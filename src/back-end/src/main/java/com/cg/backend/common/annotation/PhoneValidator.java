package com.cg.backend.common.annotation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PhoneValidator implements ConstraintValidator<Phone, String> {
    private static final Pattern phonePattern = Pattern.compile(
            "^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[013678])|(18[0,5-9]))\\\\d{8}$");


    @Override
    public void initialize(Phone constraintAnnotation){

    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context){
        if (value == null || value.length() == 0) {
            return true;
        }
        Matcher m = phonePattern.matcher(value);
        return m.matches();
    }
}
