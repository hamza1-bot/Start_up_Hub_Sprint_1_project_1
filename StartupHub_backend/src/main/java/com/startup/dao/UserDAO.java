package com.startup.dao;


import java.util.List;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.startup.model.User;

@Transactional
@Repository
public class UserDAO{
	
	@Autowired
	EntityManager entityManager; 

	
	public User save(User user) {
		return entityManager.merge(user);
	}

	
	public User findByEmail(String email, int role) {
		try {
			User user = null;
	

				user = entityManager.createQuery("from User where email = '" + email + "' and role=" + role, User.class)
						.getSingleResult();
		
			return user;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	
	
	
	
	public User findBySecretId(String secretId) {
		try {

			return entityManager.createQuery("from User where secretId = '" + secretId + "'", User.class).getSingleResult();

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public User findByEmail(String email) {
		try {

			return entityManager.createQuery("from User where email = '" + email + "'", User.class).getSingleResult();

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	
	
	
	public User findById(Long id) {
		return entityManager.find(User.class,id);
		}

	
	public User checkAuthentication(String email, String password) {
		try {
			String hql = "FROM User where email = '" + email + "' AND password= '" + password + "'";
			return (User) entityManager.createQuery(hql).getSingleResult();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@SuppressWarnings("unchecked")
	public List<User> getUserList(String condition) {
		return entityManager.createQuery("from User where "+condition).getResultList();
	}


	

}
