package br.com.PayApp.app.utils;

import br.com.PayApp.app.entity.Account;
import br.com.PayApp.app.entity.Transaction;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class TransactionSpecification implements Specification<Transaction> {

    private final Account account;

    public TransactionSpecification(Account account) {
        this.account = account;
    }

    @Override
    public Specification<Transaction> and(Specification<Transaction> other) {
        return Specification.super.and(other);
    }

    @Override
    public Specification<Transaction> or(Specification<Transaction> other) {
        return Specification.super.or(other);
    }

    @Override
    public Predicate toPredicate(Root<Transaction> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();

        if (account != null) {
            predicates.add(criteriaBuilder.or(
                    criteriaBuilder.equal(root.get("sourceAccount"), account),
                    criteriaBuilder.equal(root.get("destinationAccount"), account)
            ));
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
}
