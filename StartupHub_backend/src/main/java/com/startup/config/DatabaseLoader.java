package com.startup.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.startup.model.Roles;
import com.startup.service.RoleServices;
import com.startup.service.UserService;




@Component
public class DatabaseLoader implements CommandLineRunner {

	@Autowired
	UserService userService;
	

	@Autowired
	RoleServices roleServices;
	

    @Override
    public void run(String... strings) throws Exception {
    	addRoles();
    
    }
    
    void addRoles() {
    	List<Roles> role = roleServices.getRolesList();
    	if(role == null || role.size()==0) {
    		Roles role1 = new Roles();
    		role1.setRole("ROLE_ADMIN");
    		roleServices.addRoles(role1);
    		
    		Roles role2 = new Roles();
    		role2.setRole("ROLE_USER");
    		roleServices.addRoles(role2);
    		
    	}
    }
    
 
}
