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
 
 import java.math.BigInteger;

public class Question5 {


public static void main(String[] args) {
		
		BigInteger p = new BigInteger("9497");
		BigInteger q = new BigInteger("7187");
		BigInteger e = new BigInteger("3");
		
		BigInteger N = p.multiply(q);
		
		BigInteger phiN = p.subtract(BigInteger.ONE).multiply(q.subtract(BigInteger.ONE));
		
		System.out.println("p is "  + p);
		System.out.println("q is "  + q);
		System.out.println("e is "  + e);
		
		
		System.out.println("Phi(N) is (p-1)*(q-1) = 9496 - 7186 =  "  + phiN);
		System.out.println();
		
		System.out.println("e & Phi(N) relatively prime? : " + phiN.gcd(e).equals(BigInteger.ONE));
		System.out.println();
		
		
		BigInteger d = e.modInverse(phiN);
		System.out.println("d is e^(-1) % phi(N) =  "  + d);
		
		System.out.println();
		
		BigInteger P = new BigInteger("22446688");
		System.out.println("Given text P: " +  P);
		
		
		BigInteger C = encrypt(P, e, N);	
		
		System.out.println("Ciphertext C: " +  C);
		
		BigInteger M = decrypt(C, d, N);
		System.out.println("Decrypted ciphertext P: " +  M);
		
		System.out.println();
		
		
		BigInteger CPrime = new BigInteger("11335577");
		System.out.println("Encrypted text C': " +  CPrime);
		
		
		BigInteger PPrime = decrypt(CPrime, d, N);
		
		System.out.println("Decrypted text P': " +  PPrime);
		
		BigInteger MPrime = encrypt(PPrime, e, N); // encrypt cprime to pprime
		
		
		System.out.println("C' after encryption: " +  MPrime);
		
		
	}
	
	
	private static BigInteger encrypt(BigInteger P, BigInteger e, BigInteger N) {
		return  P.modPow(e, N);
	}
	
	
	private static BigInteger decrypt(BigInteger C, BigInteger d, BigInteger N) {
		return C.modPow(d, N);
	}
	
	
  }


