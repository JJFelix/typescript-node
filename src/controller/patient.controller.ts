import { Request, Response } from "express";
import { Patient } from "../interface/patient";
import { connection } from "../config/mysql.config";
import { QUERY } from "../query/patient.query";
import { Code } from "../enum/code.enum";
import { HttpResponse } from "../domain/response";
import { Status } from "../enum/status.enum";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";

type ResultSet = [
  RowDataPacket[] | RowDataPacket[][] | ResultSetHeader | ResultSetHeader[],
  FieldPacket[]
];
// /patients
export const getPatients = async (
  req: Request,
  res: Response
): Promise<Response<Patient[]>> => {
  console.info(`
    [${new Date().toLocaleDateString()}] 
    Incoming ${req.method} ${req.originalUrl} 
    Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}
    `);

  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_PATIENTS);
    return res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpResponse(Code.OK, Status.OK, "Patients retrieved", result[0])
      );
  } catch (error: unknown) {
    console.error(error);
    return res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAL_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          "Internal Server Error Occurred"
        )
      );
  }
};

//patient/patientId
export const getPatient = async (
  req: Request,
  res: Response
): Promise<Response<Patient[]>> => {
  console.info(`
    [${new Date().toLocaleDateString()}] 
    Incoming ${req.method} ${req.originalUrl} 
    Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}
    `);

  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_PATIENT, [
      req.params.patientId,
    ]);
    if ((result[0] as Array<ResultSet>).length > 0) {
      return res
        .status(Code.OK)
        .send(
          new HttpResponse(Code.OK, Status.OK, "Patient retrieved", result[0])
        );
    } else {
      return res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            "Patient not found"
          )
        );
    }
  } catch (error: unknown) {
    console.error(error);
    return res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAL_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          "Internal Server Error Occurred"
        )
      );
  }
};

// patient/create
export const getPatient = async (
  req: Request,
  res: Response
): Promise<Response<Patient[]>> => {
  console.info(`
    [${new Date().toLocaleDateString()}] 
    Incoming ${req.method} ${req.originalUrl} 
    Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}
    `);

  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_PATIENT, [
      req.params.patientId,
    ]);
    if ((result[0] as Array<ResultSet>).length > 0) {
      return res
        .status(Code.OK)
        .send(
          new HttpResponse(Code.OK, Status.OK, "Patient retrieved", result[0])
        );
    } else {
      return res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            "Patient not found"
          )
        );
    }
  } catch (error: unknown) {
    console.error(error);
    return res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAL_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          "Internal Server Error Occurred"
        )
      );
  }
};

