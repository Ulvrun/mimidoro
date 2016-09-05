import psycopg2
import sys


class Database:

    connection = None

    try:

        connection = psycopg2.connect("dbname='irinakuznetsova' user='irinakuznetsova'")

        cursor = connection.cursor()

        cursor.execute(
            """INSERT INTO Tasks (id, name)
             VALUES (%s, %s);""",
            (4, "Pass ISTQB Exam"))

        cursor.execute("SELECT * FROM Tasks;")

        result = cursor.fetchall()

        for row in result:
            print row

    except psycopg2.DatabaseError, e:

        if connection:
            connection.rollback()

        print 'Error %s' % e
        sys.exit(1)


    finally:

        if connection:
            connection.close()
