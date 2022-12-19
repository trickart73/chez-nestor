--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2022-12-19 22:50:33

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 24582)
-- Name: apartment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.apartment (
    id integer NOT NULL,
    name character varying(120),
    street character varying(120),
    "zipCode" character varying(120),
    city character varying(120)
);


ALTER TABLE public.apartment OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 24619)
-- Name: apartment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.apartment ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.apartment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 209 (class 1259 OID 24577)
-- Name: client; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.client (
    id integer NOT NULL,
    "firstName" character varying(120),
    "lastName" character varying(120),
    email character varying(120),
    phone character varying(120),
    "birthDate" character varying(120),
    nationality character varying(120),
    "fkRoom" integer
);


ALTER TABLE public.client OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 24603)
-- Name: client_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.client ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.client_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 211 (class 1259 OID 24587)
-- Name: room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room (
    id integer NOT NULL,
    area double precision,
    price integer,
    "fkApartment" integer,
    number integer,
    "fkClient" integer
);


ALTER TABLE public.room OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 24618)
-- Name: room_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.room ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.room_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3320 (class 0 OID 24582)
-- Dependencies: 210
-- Data for Name: apartment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.apartment (id, name, street, "zipCode", city) FROM stdin;
1	L'oiseau	54, rue Maréchal Foch	69006	Lyon
2	Apartement rue Rabelais	5, rue Rabelais	69003	Lyon
5	Apartement rue Edouard Herriot	5, rue Edouard Herriot	69002	Lyon
6	Apartement rue Edouard Herriot bis	7, rue Edouard Herriot	69002	Lyon
7	Apartement rue Edouard Herriot ter	7ter, rue Edouard Herriot	69002	Lyon
\.


--
-- TOC entry 3319 (class 0 OID 24577)
-- Dependencies: 209
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.client (id, "firstName", "lastName", email, phone, "birthDate", nationality, "fkRoom") FROM stdin;
4	Nestor	Tintin	nestor.tintin@chez-nestor.com	0601020304	01/01/1970	Guatemala	\N
5	Nestor	Tintin	nestor.tintin1@chez-nestor.com	0601020304	01/01/1970	Guatemala	\N
6	Nestor	Tintin	nestor.tintin2@chez-nestor.com	0601020304	01/01/1970	Guatemala	\N
18	Nestor	Tintin	nestor.tintin3@chez-nestor.com	0601020304	01/01/1970	Guatemala	41
\.


--
-- TOC entry 3321 (class 0 OID 24587)
-- Dependencies: 211
-- Data for Name: room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room (id, area, price, "fkApartment", number, "fkClient") FROM stdin;
2	13.2	610	1	2	\N
1	14.5	640	1	1	\N
40	15.6	590	1	3	4
41	2.2	50	1	1	18
\.


--
-- TOC entry 3330 (class 0 OID 0)
-- Dependencies: 214
-- Name: apartment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.apartment_id_seq', 7, true);


--
-- TOC entry 3331 (class 0 OID 0)
-- Dependencies: 212
-- Name: client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.client_id_seq', 37, true);


--
-- TOC entry 3332 (class 0 OID 0)
-- Dependencies: 213
-- Name: room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.room_id_seq', 41, true);


--
-- TOC entry 3177 (class 2606 OID 24607)
-- Name: apartment apartment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.apartment
    ADD CONSTRAINT apartment_pkey PRIMARY KEY (id);


--
-- TOC entry 3175 (class 2606 OID 24598)
-- Name: client client_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (id);


--
-- TOC entry 3179 (class 2606 OID 24613)
-- Name: room room_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT room_pkey PRIMARY KEY (id);


-- Completed on 2022-12-19 22:50:33

--
-- PostgreSQL database dump complete
--

