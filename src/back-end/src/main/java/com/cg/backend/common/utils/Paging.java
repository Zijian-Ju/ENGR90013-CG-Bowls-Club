package com.cg.backend.common.utils;

public class Paging {
    private Integer pageSize;
    private Integer total;
    private Integer currentPage;

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pagingSize) {
        this.pageSize = pagingSize;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Integer getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(Integer currentPage) {
        this.currentPage = currentPage;
    }

    @Override
    public String toString() {
        return "Paging{" +
                "pagingSize=" + pageSize +
                ", total=" + total +
                ", currentPage=" + currentPage +
                '}';
    }
}
