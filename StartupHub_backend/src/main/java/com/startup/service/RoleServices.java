package com.startup.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.startup.dao.RoleDAO;
import com.startup.model.Roles;

@Service
public class RoleServices  {
	
	@Autowired
	RoleDAO roleDao;

	public Roles getRoleById(int id) {
		return roleDao.getRoleById(id);
	}

	public Roles addRoles(Roles role) {
		return roleDao.addRoles(role);
	}

	public List<Roles> getRolesList() {
		return roleDao.getRolesList();
	}

}
