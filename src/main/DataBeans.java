package main;

import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import java.io.IOException;
import java.io.Serializable;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class DataBeans implements Serializable {
    private static final long serialVersionUID = 1L;
    private List<Data> array;
    private EntityManagerFactory entityManagerFactory;
    private EntityManager entityManager;
    private EntityTransaction trans;
    private Data newData;

    public DataBeans() throws IOException {
        connectToDB();
        firstLoad();
        newData = new Data();
        ;
    }

    private void connectToDB() {
        entityManagerFactory = Persistence.createEntityManagerFactory("Data");
        entityManager = entityManagerFactory.createEntityManager();
        trans = entityManager.getTransaction();
    }

    private void firstLoad() throws IOException {
        array = new ArrayList();
        try {
            trans.begin();
            array = (List<Data>) entityManager.createQuery("SELECT d FROM Data d").getResultList();
            trans.commit();
        } catch (RuntimeException exception) {
            if (trans.isActive()) {
                trans.rollback();
            }
            ExternalContext context = FacesContext.getCurrentInstance().getExternalContext();
            context.redirect(context.getRequestContextPath() + "/error.jsf");
        }
    }

    public void addData() throws IOException {
        try {
            long start = System.nanoTime();
            SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss");
            String time = formatter.format(new Date(System.currentTimeMillis()));
            trans.begin();
            newData.checkAll();
            newData.setTime(time);
            double scriptTime = (System.nanoTime() - start) * Math.pow(10, -6);
            BigDecimal bd = new BigDecimal(Double.toString(scriptTime));
            bd = bd.setScale(3, RoundingMode.HALF_UP);
            scriptTime = bd.doubleValue();
            newData.setScriptTime(scriptTime);
            entityManager.persist(newData);
            array.add(newData);
            newData = new Data();
            trans.commit();
        } catch (RuntimeException exception) {
            if (trans.isActive()) {
                trans.rollback();
            }
            ExternalContext context = FacesContext.getCurrentInstance().getExternalContext();
            context.redirect(context.getRequestContextPath() + "/error.jsf");
        }
    }

    public void clear() throws IOException {
        try {
            trans.begin();
            entityManager.createQuery("DELETE FROM Data").executeUpdate();
            array.clear();
            trans.commit();
        } catch (RuntimeException exception) {
            if (trans.isActive()) {
                trans.rollback();
            }
            ExternalContext context = FacesContext.getCurrentInstance().getExternalContext();
            context.redirect(context.getRequestContextPath() + "/error.jsf");
        }
    }

    public List<Data> getArray() {
        return array;
    }

    public void setArray(List<Data> array) {
        this.array = array;
    }

    public Data getNewData() {
        return newData;
    }

    public void setNewData(Data newData) {
        this.newData = newData;
    }
}