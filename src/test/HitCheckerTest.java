package test;

import main.Data;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;

public class HitCheckerTest {
    private Data data;
    private final int r = 10;

    @Before
    public void init() {
        data = new Data();
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldThrowExceptionOnYIncorrectValue() { data.setY(Double.parseDouble("-10")); }

    @Test
    public void firstQuarterTest(){
        for (int y = 0; y <= r; y++){
            for (int x = 0; x <= r / 2; x++){
                assertEquals(data.rectangle(x, y, r), y <= r);
            }
        }
    }

    @Test
    public void secondQuarterTest(){
        for (int y = 0; y < r; y++){
            for (int x = 0; x >= -r; x--){
                assertEquals(data.circle(x, y, r),x*x + y*y <= r*r);
            }
        }
    }

    @Test
    public void thirdQuarterTest(){
        for (int y = -1; y >= -r; y--){
            for (int x = -1; x >= -r; x--){
                assertEquals(data.triangle(x, y, r), y >= -x * 2 - r);
            }
        }
    }

    @Test
    public void scalabilityTest(){
        boolean answer = true;
        data.setX((double)1);
        data.setY((double)1);
        data.setR((double)1);
        data.checkAll();
        if (data.getAnswer().equals("нет"))
            answer = false;
        boolean firstQ = answer;

        data.setX((double)-1);
        data.setY((double)1);
        data.setR((double)1);
        data.checkAll();
        if (data.getAnswer().equals("нет"))
            answer = false;
        else answer = true;
        boolean secondQ = answer;

        data.setX((double)-1);
        data.setY((double)-1);
        data.setR((double)1);
        data.checkAll();
        if (data.getAnswer().equals("нет"))
            answer = false;
        else answer = true;
        boolean thirdQ = answer;

        data.setX((double)1);
        data.setY((double)-1);
        data.setR((double)1);
        data.checkAll();
        if (data.getAnswer().equals("нет"))
            answer = false;
        else answer = true;
        boolean fourthQ = answer;

        for (int i = 0; i < 5; i++) {
            float constant = (float) Math.random();
            data.setX((double)constant);
            data.setY((double)constant);
            data.setR((double)constant);
            data.checkAll();
            if (data.getAnswer().equals("нет"))
                answer = false;
            else answer = true;
            assertEquals(answer, firstQ);

            data.setX((double)-constant);
            data.setY((double)constant);
            data.setR((double)constant);
            data.checkAll();
            if (data.getAnswer().equals("нет"))
                answer = false;
            else answer = true;
            assertEquals(answer, secondQ);

            data.setX((double)-constant);
            data.setY((double)-constant);
            data.setR((double)constant);
            data.checkAll();
            if (data.getAnswer().equals("нет"))
                answer = false;
            else answer = true;
            assertEquals(answer, thirdQ);

            data.setX((double)constant);
            data.setY((double)-constant);
            data.setR((double)constant);
            data.checkAll();
            if (data.getAnswer().equals("нет"))
                answer = false;
            else answer = true;
            assertEquals(answer, fourthQ);
        }
    }
}