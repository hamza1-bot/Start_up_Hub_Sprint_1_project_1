package com.startup.utils;


import java.util.Random;
import java.util.UUID;





public class Commons {
	
	//Generate filename 
	public static String getFileName(){
			String CHAR_LIST = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
			int RANDOM_STRING_LENGTH = 10;
			StringBuffer randStr = new StringBuffer();
			for (int i = 0; i < RANDOM_STRING_LENGTH; i++) {
				int number;
				int randomInt = 0;
				Random randomGenerator = new Random();
				randomInt = randomGenerator.nextInt(52);
				if (randomInt - 1 == -1) {
					number = randomInt;
				} else {
					number = randomInt - 1;
				}
				char ch = CHAR_LIST.charAt(number);
				randStr.append(ch);
			}
			return randStr.toString();
	 }
	
	
	
	
	public static String getRandomStringId() {
		String randomString = UUID.randomUUID().toString().toUpperCase();
		return randomString;

	}

	
	
}
