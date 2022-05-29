package pl.edu.agh.boil.project2.broker_task;

import org.springframework.boot.SpringApplication;
<<<<<<< HEAD
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;

@SpringBootApplication
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class,HibernateJpaAutoConfiguration.class})
=======
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
>>>>>>> main
public class BrokerTaskApplication {

	public static void main(String[] args) {
		SpringApplication.run(BrokerTaskApplication.class, args);
	}

}
