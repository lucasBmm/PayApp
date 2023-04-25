package br.com.PayApp.app.utils;

import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;

public class SortUtils {

    public static List<Sort.Order> parseSortOrders(String[] sortParams) {
        List<Sort.Order> orders = new ArrayList<>();
        for (String sortParam : sortParams) {
            String[] sortPair = sortParam.split(",");
            if (sortPair.length == 2) {
                String property = sortPair[0];
                Sort.Direction direction = Sort.Direction.fromString(sortPair[1]);
                orders.add(new Sort.Order(direction, property));
            }
        }
        return orders;
    }
}
