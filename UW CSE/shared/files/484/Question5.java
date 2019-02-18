import java.util.*;

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

class Question7 {
	public static void main(String[] args) {

		String[] P1_1_hex = { "43", "72", "79", "70", "74", "6F", "67", "72", "61", "70", "68", "79", "20", "43", "72",
				"79" };
		String[] P1_2_hex = { "70", "74", "6F", "67", "72", "61", "70", "68", "79", "20", "43", "72", "79", "70", "74",
				"6F" };
		String[] C1_1_hex = { "46", "64", "DC", "06", "97", "BB", "FE", "69", "33", "07", "15", "07", "9B", "A6", "C2",
				"3D" };
		String[] C1_2_hex = { "2B", "84", "DE", "4F", "90", "8D", "7D", "34", "AA", "CE", "96", "8B", "64", "F3", "DF",
				"75" };

		String[] C2_1_hex = { "55", "7A", "C0", "17", "90", "B1", "FD", "74", "3C", "18", "09", "0C", "DE", "90", "C3",
				"21" };
		String[] C2_2_hex = { "2F", "98", "D4", "4B", "8D", "99", "63", "28", "B6", "9C", "F5", "C3", "34", "F7", "C5",
				"62" };

		List<Integer> P1_1_dec = getDecValues(P1_1_hex);
		List<Integer> P1_2_dec = getDecValues(P1_2_hex);

		List<Integer> C1_1_dec = getDecValues(C1_1_hex);
		List<Integer> C1_2_dec = getDecValues(C1_2_hex);

		List<Integer> C2_1_dec = getDecValues(C2_1_hex);
		List<Integer> C2_2_dec = getDecValues(C2_2_hex);

		// Zeroth block in P1 represents the counter

		System.out.println("Plain Text P1:");

		System.out.println("P1 First Block in DEC = " + P1_1_dec);
		System.out.println("P1 Second Block in DEC = " + P1_2_dec);

		System.out.println();

		System.out.println("Cipher Text C1:");
		System.out.println("C1 First Block in DEC  = " + C1_1_dec);
		System.out.println("C1 Second Block in DEC = " + C1_2_dec);
		System.out.println();

		System.out.println("Cipher Text C2:");
		System.out.println("C2 First Block in DEC = " + C2_1_dec);
		System.out.println("C2 Second Block in DEC = " + C2_2_dec);

		System.out.println();

		System.out.println();

		System.out.println("Generating keys from blocks of P1 and C1......");

		System.out.println();

		System.out.println("Decrypting the Ciphertext C2 to P2 using generated keys.....");

		System.out.println();

		List<Integer> key1 = geyKeyStream(P1_1_dec, C1_1_dec);
		List<Integer> key2 = geyKeyStream(P1_2_dec, C1_2_dec);

		// Get the Plain Text blocks.
		List<Integer> P2_1_dec = getPlainTextBlock(C2_1_dec, key1);
		List<Integer> P2_2_dec = getPlainTextBlock(C2_2_dec, key2);

		// Get the Plain Text blocks.
		List<String> P2_1_hex = getHexValues(P2_1_dec);
		List<String> P2_2_hex = getHexValues(P2_2_dec);

		System.out.println("Resulting Plain Text P2:");
		System.out.println("P2 First Block in HEX = " + P2_1_hex);
		System.out.println("P2 Second Block in HEX = " + P2_2_hex);

		System.out.println();

	}

	private static List<Integer> getPlainTextBlock(List<Integer> cipherTextBlock, List<Integer> key) {

		List<Integer> plainText = new ArrayList<Integer>();
		for (int i = 0; i < cipherTextBlock.size(); i++) {
			int cipherElement = cipherTextBlock.get(i);
			int x = key.get(i);
			int result = cipherElement ^ x;
			plainText.add(result);
		}
		return plainText;

	}

	private static Integer hexToDec(String s) {
		String digits = "0123456789ABCDEF";
		s = s.toUpperCase();
		int val = 0;
		for (int i = 0; i < s.length(); i++) {
			char c = s.charAt(i);
			int d = digits.indexOf(c);
			val = 16 * val + d;
		}
		return val;
	}

	private static List<String> getHexValues(List<Integer> decBlock) {
		List<String> hexValues = new ArrayList<String>();
		for (int i = 0; i < decBlock.size(); i++) {
			hexValues.add(Integer.toHexString(decBlock.get(i)));
		}
		return hexValues;
	}

	private static List<Integer> getDecValues(String[] hexBlock) {
		List<Integer> decimalValues = new ArrayList<Integer>();
		for (int i = 0; i < hexBlock.length; i++) {
			decimalValues.add(hexToDec(hexBlock[i]));
		}
		return decimalValues;
	}

	private static List<Integer> geyKeyStream(List<Integer> plainTextBlock, List<Integer> cipherTextBlock) {
		List<Integer> key = new ArrayList<Integer>();
		for (int i = 0; i < plainTextBlock.size(); i++) {
			int p1Element = plainTextBlock.get(i);
			int c1Element = cipherTextBlock.get(i);
			int result = p1Element ^ c1Element;
			key.add(result);
		}
		return key;

	}

}