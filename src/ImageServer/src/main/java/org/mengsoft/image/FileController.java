package org.mengsoft.image;

import ch.qos.logback.core.util.FileUtil;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Controller
public class FileController {

    @Resource
    HttpServletRequest request;

    @RequestMapping(value="/upload", method = RequestMethod.POST)
    public @ResponseBody
    Map<String,Object> uploadImg(@RequestParam("file") MultipartFile file) {
        Map<String,Object> map = new HashMap<String,Object>();
        String file_address = "";
        if(!file.isEmpty()) {
            try {
                String base = "http://128.199.253.108:9091/";
                String filepath = "/home/blog/filebed/frontend/";
                @SuppressWarnings("static-access")
//                String k =new String().valueOf((int)((Math.random()*9+1)*100000));
                String newfilename = UUID.randomUUID().toString() + ".";
                String fileName = file.getOriginalFilename();// Filename
                String suffix = fileName.substring(fileName.lastIndexOf(".") + 1);//File  Suffix
                BufferedOutputStream out = new BufferedOutputStream(
                        new FileOutputStream(new File(filepath+newfilename+suffix)));
                file_address = base+newfilename+suffix;// Access path
                out.write(file.getBytes());
                out.flush();
                out.close();
            }catch(FileNotFoundException e) {
                e.printStackTrace();
                map.put("code", 404);
                return map;
            } catch (IOException e) {
                e.printStackTrace();
                map.put("code", 500);
                return map;
            }
        }else {
            map.put("code", 404);
            return map;
        }

        map.put("code", 200);
        map.put("img", file_address);// Img path
        return map;
    }

}
