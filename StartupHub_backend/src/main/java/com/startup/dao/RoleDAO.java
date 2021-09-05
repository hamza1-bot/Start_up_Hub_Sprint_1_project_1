package com.startup.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.startup.model.Roles;

@Repository
@Transactional
public class RoleDAO {
	
	@Autowired
	EntityManager entityManager;

	public Roles getRoleById(int id) {
		return entityManager.find(Roles.class, id); 
		}

	public Roles addRoles(Roles role) {
		return entityManager.merge(role);
		}

	@SuppressWarnings("unchecked")
	public List<Roles> getRolesList() {
		return entityManager.createQuery("from Roles").getResultList();
		}

}
