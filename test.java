
/******************************************************************************
 * Online JAVA Language Compiler.
 * Write your code in this editor and press "Run" button to execute it.
 *******************************************************************************/
import java.util.*;

class test {
    public static void main(String[] args) {
        // Scanner sc = new Scanner (System.in);
        // String s = sc.nextLine();
        String s = "programming is awesome";
        // System.out.println(s);
        String[] str = s.split(" ");
        // for(int i = 0 ; i < str.length ; i++){
        // System.out.println(str[i]);
        // }
        int score = 0;
        for (int i = 0; i < str.length; i++) {
            String temp = str[i];
            int cons = 0;
            Set<Character> vow = new HashSet<>();
            for (int j = 0; j < temp.length(); j++) {
                if (temp.charAt(j) == 'a' || temp.charAt(j) == 'e' || temp.charAt(j) == 'i' || temp.charAt(j) == 'o'
                        || temp.charAt(j) == 'u') {
                    vow.add(temp.charAt(j));
                } else if (temp.charAt(j) >= 'a' && temp.charAt(j) <= 'z') {
                    cons++;
                }
            }
            if ((vow.size()) % 2 == 0 && cons % 2 == 0) {
                score += temp.length() * 3;
            } else if ((vow.size()) % 2 != 0 && cons % 2 != 0) {
                score += temp.length() * 2;
            } else if ((vow.size()) % 2 == 0 && cons % 2 != 0 || (vow.size()) % 2 != 0 && cons % 2 == 0) {
                score += temp.length();
            }
        }
        System.out.println(score);
    }
}