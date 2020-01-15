# Payshield command authorization (according to Payshield Host Command Reference Manual v3.2)

| Command code | Command description                                                                        | Authorization required (Yes/No/Optional)     | Authorization console command             |
| :----------- | :----------------------------------------------------------------------------------------- | :------------------------------------------: | ----------------------------------------- |
|A0 (A1)       |Generate a Key                                                                              | Y (depending on the key being generated [1]) | generate.{key}.host AND export.{key}.host |
|A4 (A5)       |Form a Key from Encrypted Components                                                        | Y                                            | component.{key}.host                      |
|A6 (A7)       |Import a Key                                                                                | Y (depending on the key being imported [2])  | import.{key}.host                         |
|A8 (A9)       |Export a Key                                                                                | Y (depending on the key being exported [3])  | export.{key}.host                         |
|B2 (B3)       |Echo Command                                                                                | N | - |
|BG (BH)       |Translate a PIN and PIN Length                                                              | N | - |
|BK (BL)       |Generate an IBM PIN Offset (of a customer selected PIN)                                     | N | - |
|BS (BT)       |Erase the Key Change Storage                                                                | N | - |
|BU (BV)       |Generate a Key Check Value                                                                  | Y (depending on the requested KCV length [4])| generate.{key}.host                       |
|BW (BX)       |Translate Keys from Old LMK to New LMK and Migrate to New Key Type                          | N | - |
|CA (CB)       |Translate a PIN from TPK to ZPK/BDK (3DES DUKPT) Encryption                                 | N | - |
|CC (CD)       |Translate a PIN from one ZPK to another                                                     | N | - |
|CU (CV)       |Verify a PIN & Generate an ABA PVV (of a customer selected PIN)                             | N | - |
|CW (CX)       |Generate a Card Verification Code/Value                                                     | N | - |
|CY (CZ)       |Verify a Card Verification Code/Value                                                       | N | - |
|DA (DB)       |Verify a Terminal PIN Using the IBM Offset Method                                           | N | - |
|DC (DD)       |Verify a Terminal PIN Using the ABA PVV Method                                              | N | - |
|DE (DF)       |Generate an IBM PIN Offset (of an LMK encrypted PIN)                                        | N | - |
|DG (DH)       |Generate an ABA PVV (of an LMK encrypted PIN)                                               | N | - |
|DU (DV)       |Verify a PIN & Generate an IBM PIN Offset (of customer selected new PIN)                    | N | - |
|EA (EB)       |Verify an Interchange PIN Using the IBM Offset Method                                       | N | - |
|EC (ED)       |Verify an Interchange PIN Using the ABA PVV Method                                          | N | - |
|EE (EF)       |Derive a PIN Using the IBM Offset Method                                                    | N | - |
|FM (FN)       |Translate a ZEK/ZAK from LMK to ZMK Encryption                                              | N | - |
|FW (FX)       |Generate an ABA PVV (of a customer selected PIN)                                            | N | - |
|G0 (G1)       |Translate a PIN from BDK to BDK or ZPK Encryption (3DES DUKPT)                              | N | - |
|GM (GN)       |Hash a Block of Data                                                                        | N | - |
|GO (GP)       |Verify a PIN Using the IBM Offset Method (3DES DUKPT)                                       | N | - |
|GQ (GR)       |Verify a PIN Using the ABA PVV Method (3DES DUKPT)                                          | N | - |
|GW (GX)       |Generate/Verify a MAC (3DES DUKPT)                                                          | N | - |
|JA (JB)       |Generate a Random PIN                                                                       | N | - |
|JC (JD)       |Translate a PIN from TPK to LMK Encryption                                                  | N | - |
|JE (JF)       |Translate a PIN from ZPK to LMK Encryption                                                  | N | - |
|JG (JH)       |Translate a PIN from LMK to ZPK Encryption                                                  | N | - |
|KQ (KR)       |ARQC Verification and/or ARPC Generation (Using Static or MasterCard Proprietary SKD Method)| O [5]                                        | diag.host                                 |
|KW (KX)       |ARQC Verification and/or ARPC Generation (Using EMV or Cloud-Based SKD Methods)             | O [5]                                        | diag.host                                 |
|LO (LP)       |Translate Decimalisation Table from Old to New LMK                                          | N | - |
|M0 (M1)       |Encrypt Data Block                                                                          | N | - |
|M2 (M3)       |Decrypt Data Block                                                                          | N | - |
|M4 (M5)       |Translate Data Block                                                                        | N | - |
|M6 (M7)       |Generate MAC                                                                                | N | - |
|M8 (M9)       |Verify MAC                                                                                  | N | - |
|PA (PB)       |Load Formatting Data to HSM                                                                 | N | - |
|PC (PD)       |Load Additional Formatting Data to HSM                                                      | N | - |
|PE (PF, PZ)   |Print PIN/PIN and Solicitation Data                                                         | Y                                            | pin.mailer.host                           |
|QK (QL)       |Translate Account Number for LMK-encrypted PIN                                              | N | - |
|TA (TB, TZ)   |Print TMK Mailer                                                                            | Y                                            | command.ta.host                           |

- [1] - check the Key Type Table (G and E) for additional information on the requirements
- [2] - check the Key Type Table (I) for additional information on the requirements
- [3] - check the Key Type Table (E) for additional information on the requirements
- [4] - generation of a 6-digit KCV does not require authorization (Key Type Table G); generation of a non-6-digit KCV requires authorization
- [5] - diagnostic data is produced by this command only if the HSM is in Authorized state
- {key} - available key types depending on the command type being authorized (Generate, Import, Export or component):
  - Generate - rsa, 000, 100, 200, 001, 002, 302, 402, 003, 105, 205, 305, 405, 505, 605, 705, 805, 905, 006, 106, 206, 306, 406, 506, 606, 107, 207, 507, 607, 807, 907, 008, 009, 109, 209, 309, 409, 509, 609, 709, 809, 909, 00a, 10a, 00b, 30b, 00c, 10c, 00d, 30d, 40d, 50d, 70d, 80d, 90d
  - Import - rsa, 000, 107, 207, 00a, 00c, 00d
  - Export - rsa, 100, 200, 001, 002, 302, 402, 003, 105, 205, 305, 405, 505, 605, 705, 805, 905, 006, 106, 206, 306, 406, 506, 606, 107, 207, 607, 807, 907, 008, 009, 109, 209, 309, 409, 509, 609, 709, 809, 909, 00a, 30b, 00c, 10c, 30d, 40d, 50d, 70d, 80d, 90d
  - component - 000, 100, 200, 001, 002, 302, 402, 003, 105, 205, 305, 405, 505, 605, 705, 805, 905, 006, 106, 206, 306, 406, 506, 606, 107, 207, 507, 607, 807, 907, 008, 009, 109, 209, 309, 409, 509, 609, 709, 809, 909, 00a, 10a, 00b, 30b, 00c, 10c, 00d, 30d, 40d, 50d, 70d, 80d, 90d
