/*
 * Copyright ©2018 Uday Mahajan.  All rights reserved.  Permission is
 * hereby granted to staff registered for University of Washington
 * CSE 484 for use solely during Autumn Quarter 2018 for purposes of
 * the course.  No other use, copying, distribution, or modification
 * is permitted without prior written consent. Copyrights for
 * third-party components of this work must be honored.
 */
 
 /*
 This file will be deleted on December 1st, 2018
 */

public class Question3 { 



public static void main(String[] args) {
		 int [] cipher = {14, 17, 3, 28, 3, 28, 10, 21, 28, 14, 1, 24, 26, 19, 3, 5, 31, 26, 24, 5, 9, 14, 14, 9,
				 26, 5, 27, 24, 16, 4, 14, 19, 26, 28, 28, 1, 13, 26, 28, 23, 3, 14, 17, 1, 28, 21, 8, 28, 14, 3, 14, 21, 14, 3, 9, 5, 27, 3,
				 4, 17, 26, 24, 23, 17, 3, 27, 17, 14, 17, 3, 28, 8, 1, 28, 3, 27, 1, 12, 12, 16, 3,28};


		 String str = "";
		 for (int num : cipher) {
			 char ch = (char)(Math.pow(num, 7) % 33 + 64);
			 str = str + ch;
		 }
		System.out.println(str);
	
		// N= 33
		// P= 3 q = 11
		// phi(N) = (p-1)(q-1) = 20
		// d = e^(-1) mod (phi(N)) =  (3^(-1)) % 20 = 7
	
	}























}
 