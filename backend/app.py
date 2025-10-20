from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)  # permite que React acceda al backend

# Conexión a MySQL
conexion = mysql.connector.connect(
    host="localhost",
    user="root",
    password="tu_password",
    database="tu_base"
)

@app.route('/usuarios', methods=['GET'])
def obtener_usuarios():
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuarios")
    resultados = cursor.fetchall()
    cursor.close()
    return jsonify(resultados)

@app.route('/usuarios', methods=['POST'])
def agregar_usuario():
    data = request.json
    cursor = conexion.cursor()
    sql = "INSERT INTO usuarios (nombre, correo) VALUES (%s, %s)"
    cursor.execute(sql, (data['nombre'], data['correo']))
    conexion.commit()
    cursor.close()
    return jsonify({"mensaje": "Usuario agregado correctamente"})

if __name__ == '__main__':
    app.run(debug=True)
