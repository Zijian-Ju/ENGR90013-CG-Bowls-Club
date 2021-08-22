package com.cg.backend.common.utils;

import java.util.HashMap;
import java.util.Map;

public class Tools {

    public static Map<String, Integer> ConvertPaging2Bound(Paging paging) {
        Integer startNum = (paging.getCurrentPage() - 1) * paging.getPageSize();
        Integer endNum = paging.getCurrentPage() * paging.getPageSize();
        Map<String, Integer> pagingMap = new HashMap<>();
        pagingMap.put("startNum", startNum);
        pagingMap.put("endNum", endNum);
        return pagingMap;
    }
}
