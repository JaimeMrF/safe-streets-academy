--
-- PostgreSQL database cluster dump
--

\restrict O9xdG7unRx8cl97SsnQY4o64KZoxbR6qNVcwaZcE4hXdJk2RYWi8Gi6nHoD28zl

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE anon;
ALTER ROLE anon WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE authenticated;
ALTER ROLE authenticated WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE authenticator;
ALTER ROLE authenticator WITH NOSUPERUSER NOINHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:Ein7+BfSSxplwfB30WwIRA==$aExS8XWHfOLZier83tuZePujGWUpXHBQ6qS3cBxaHaI=:JeB77iWkc1suKFx8CNgOtPzeU1A9QElJsUjub2hr37M=';
CREATE ROLE dashboard_user;
ALTER ROLE dashboard_user WITH NOSUPERUSER INHERIT CREATEROLE CREATEDB NOLOGIN REPLICATION NOBYPASSRLS;
CREATE ROLE pgbouncer;
ALTER ROLE pgbouncer WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:ft8qmf34fTNFK7x8QeuShg==$0KRE1YvfAeE27sAeDJsCNNBsNEQaXRiPiuWgaJTgyuU=:aP7VTwnBQmhqqcEVmWJ+SO8D9I5pwuM4j9s5GzCPcck=';
CREATE ROLE postgres;
ALTER ROLE postgres WITH NOSUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:EVlN486pfZXm/rt9qtHn5A==$eNTlNCWXEx2PEmCwJmGGj4XVkckvl6Z+3ywiHBPplBw=:7EjTdvS4o6BEeETFZ5veWWx8NMFX9+/D9O9GPZR37Xc=';
CREATE ROLE service_role;
ALTER ROLE service_role WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION BYPASSRLS;
CREATE ROLE supabase_admin;
ALTER ROLE supabase_admin WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:UavSW5FWCmHJNfMveL+YIA==$PnrGS1zGNSph2h9wSMiyPfBr+rpEvnXe5G4wykod/Fw=:LBWaVOQ0DnRJY3WuOsG4Tk6lFXmeoHPPWuXjR68wbNI=';
CREATE ROLE supabase_auth_admin;
ALTER ROLE supabase_auth_admin WITH NOSUPERUSER NOINHERIT CREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:Skbfu8DYr1qsWGcmdmCSgw==$Gt/yGtcEvgnPAa2PkKjkshihO82PqfUaeBayuwulQx4=:4hYAJcfMgbiQr4ow/NPrwu1KXhI8adys4xpeTfuGjUQ=';
CREATE ROLE supabase_etl_admin;
ALTER ROLE supabase_etl_admin WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN REPLICATION NOBYPASSRLS;
CREATE ROLE supabase_functions_admin;
ALTER ROLE supabase_functions_admin WITH NOSUPERUSER NOINHERIT CREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE supabase_read_only_user;
ALTER ROLE supabase_read_only_user WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:AhoRUJEt4/utf2Qll7JGzQ==$Hiia2kkm6s2mUzNh9NUxU6sKTWGRyvt9AwCvhJLZGfI=:G4+im7vMGudUTsnWZ1rJRKu9xeUd8OGIofkaF1o6zkk=';
CREATE ROLE supabase_realtime_admin;
ALTER ROLE supabase_realtime_admin WITH NOSUPERUSER NOINHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE supabase_replication_admin;
ALTER ROLE supabase_replication_admin WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN REPLICATION NOBYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:qEybCDRzsZHCxGi2rlWpbg==$O2frDVHTWteTudHn5ww63fz7UnQz0FBxknv+2SsuoE4=:QVWIFUlhuoRLAkgtDF43G2pORvQoY+Y4MGsNURmPDpc=';
CREATE ROLE supabase_storage_admin;
ALTER ROLE supabase_storage_admin WITH NOSUPERUSER NOINHERIT CREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:ecogAIw9GsRbWJBWl4F92g==$/lzYaqy7CU6GPttfEcKBMT65h4GVl5f8BNMcYKA+euA=:72hXeZRafKNV6S7mlqaDzC1+gZq4OQR9TL2p3FdxwFA=';

--
-- User Configurations
--

--
-- User Config "anon"
--

ALTER ROLE anon SET statement_timeout TO '3s';

--
-- User Config "authenticated"
--

ALTER ROLE authenticated SET statement_timeout TO '8s';

--
-- User Config "authenticator"
--

ALTER ROLE authenticator SET session_preload_libraries TO 'safeupdate';
ALTER ROLE authenticator SET statement_timeout TO '8s';
ALTER ROLE authenticator SET lock_timeout TO '8s';

--
-- User Config "postgres"
--

ALTER ROLE postgres SET search_path TO E'\\$user', 'public', 'extensions';

--
-- User Config "supabase_admin"
--

ALTER ROLE supabase_admin SET search_path TO E'\\$user', 'public', 'auth', 'extensions';
ALTER ROLE supabase_admin SET log_statement TO 'none';

--
-- User Config "supabase_auth_admin"
--

ALTER ROLE supabase_auth_admin SET search_path TO 'auth';
ALTER ROLE supabase_auth_admin SET idle_in_transaction_session_timeout TO '60000';
ALTER ROLE supabase_auth_admin SET log_statement TO 'none';

--
-- User Config "supabase_functions_admin"
--

ALTER ROLE supabase_functions_admin SET search_path TO 'supabase_functions';

--
-- User Config "supabase_read_only_user"
--

ALTER ROLE supabase_read_only_user SET default_transaction_read_only TO 'on';

--
-- User Config "supabase_storage_admin"
--

ALTER ROLE supabase_storage_admin SET search_path TO 'storage';
ALTER ROLE supabase_storage_admin SET log_statement TO 'none';


--
-- Role memberships
--

GRANT anon TO authenticator WITH INHERIT FALSE GRANTED BY supabase_admin;
GRANT anon TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT authenticated TO authenticator WITH INHERIT FALSE GRANTED BY supabase_admin;
GRANT authenticated TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT authenticator TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT authenticator TO supabase_storage_admin WITH INHERIT FALSE GRANTED BY supabase_admin;
GRANT pg_create_subscription TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT pg_monitor TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT pg_monitor TO supabase_etl_admin WITH INHERIT TRUE GRANTED BY supabase_admin;
GRANT pg_monitor TO supabase_read_only_user WITH INHERIT TRUE GRANTED BY supabase_admin;
GRANT pg_read_all_data TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT pg_read_all_data TO supabase_etl_admin WITH INHERIT TRUE GRANTED BY supabase_admin;
GRANT pg_read_all_data TO supabase_read_only_user WITH INHERIT TRUE GRANTED BY supabase_admin;
GRANT pg_signal_backend TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT service_role TO authenticator WITH INHERIT FALSE GRANTED BY supabase_admin;
GRANT service_role TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT supabase_functions_admin TO postgres WITH INHERIT TRUE GRANTED BY supabase_admin;
GRANT supabase_realtime_admin TO postgres WITH INHERIT TRUE GRANTED BY supabase_admin;






\unrestrict O9xdG7unRx8cl97SsnQY4o64KZoxbR6qNVcwaZcE4hXdJk2RYWi8Gi6nHoD28zl

--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

\restrict nfaX6BqpyTqacehscwYwKroz5F0Xr6GSedZJbgBm4cA169AYbFls3aRaOQ12PZK

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

\unrestrict nfaX6BqpyTqacehscwYwKroz5F0Xr6GSedZJbgBm4cA169AYbFls3aRaOQ12PZK

--
-- Database "_supabase" dump
--

--
-- PostgreSQL database dump
--

\restrict U8Imk6duUyam0AiLgHVus614FYq9iFUJYQ9W5Udi5S4EAUfZEDIbum83Syrde1p

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: _supabase; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE _supabase WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = icu LOCALE = 'en_US.UTF-8' ICU_LOCALE = 'en-US';


ALTER DATABASE _supabase OWNER TO postgres;

\unrestrict U8Imk6duUyam0AiLgHVus614FYq9iFUJYQ9W5Udi5S4EAUfZEDIbum83Syrde1p
\connect _supabase
\restrict U8Imk6duUyam0AiLgHVus614FYq9iFUJYQ9W5Udi5S4EAUfZEDIbum83Syrde1p

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: _analytics; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA _analytics;


ALTER SCHEMA _analytics OWNER TO postgres;

--
-- Name: _supavisor; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA _supavisor;


ALTER SCHEMA _supavisor OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alert_queries; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.alert_queries (
    id bigint NOT NULL,
    name character varying(255),
    token uuid,
    query text,
    description text,
    language character varying(255),
    cron character varying(255),
    source_mapping jsonb,
    slack_hook_url character varying(255),
    webhook_notification_url character varying(255),
    user_id bigint,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


ALTER TABLE _analytics.alert_queries OWNER TO supabase_admin;

--
-- Name: alert_queries_backends; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.alert_queries_backends (
    id bigint NOT NULL,
    alert_query_id bigint,
    backend_id bigint
);


ALTER TABLE _analytics.alert_queries_backends OWNER TO supabase_admin;

--
-- Name: alert_queries_backends_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.alert_queries_backends_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.alert_queries_backends_id_seq OWNER TO supabase_admin;

--
-- Name: alert_queries_backends_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.alert_queries_backends_id_seq OWNED BY _analytics.alert_queries_backends.id;


--
-- Name: alert_queries_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.alert_queries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.alert_queries_id_seq OWNER TO supabase_admin;

--
-- Name: alert_queries_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.alert_queries_id_seq OWNED BY _analytics.alert_queries.id;


--
-- Name: backends; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.backends (
    id bigint NOT NULL,
    name character varying(255),
    description text,
    user_id bigint,
    type character varying(255),
    config jsonb,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    token uuid NOT NULL,
    metadata jsonb,
    config_encrypted bytea,
    default_ingest boolean DEFAULT false
);


ALTER TABLE _analytics.backends OWNER TO supabase_admin;

--
-- Name: backends_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.backends_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.backends_id_seq OWNER TO supabase_admin;

--
-- Name: backends_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.backends_id_seq OWNED BY _analytics.backends.id;


--
-- Name: billing_accounts; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.billing_accounts (
    id bigint NOT NULL,
    latest_successful_stripe_session jsonb,
    stripe_customer character varying(255),
    user_id bigint,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    stripe_subscriptions jsonb,
    stripe_invoices jsonb,
    "lifetime_plan?" boolean DEFAULT false,
    lifetime_plan_invoice character varying(255),
    default_payment_method character varying(255),
    custom_invoice_fields jsonb[] DEFAULT ARRAY[]::jsonb[],
    lifetime_plan boolean DEFAULT false NOT NULL
);


ALTER TABLE _analytics.billing_accounts OWNER TO supabase_admin;

--
-- Name: billing_accounts_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.billing_accounts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.billing_accounts_id_seq OWNER TO supabase_admin;

--
-- Name: billing_accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.billing_accounts_id_seq OWNED BY _analytics.billing_accounts.id;


--
-- Name: billing_counts; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.billing_counts (
    id bigint NOT NULL,
    node character varying(255),
    count integer,
    user_id bigint,
    source_id bigint,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


ALTER TABLE _analytics.billing_counts OWNER TO supabase_admin;

--
-- Name: billing_counts_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.billing_counts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.billing_counts_id_seq OWNER TO supabase_admin;

--
-- Name: billing_counts_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.billing_counts_id_seq OWNED BY _analytics.billing_counts.id;


--
-- Name: endpoint_queries; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.endpoint_queries (
    id bigint NOT NULL,
    name character varying(255),
    token uuid,
    query text,
    user_id bigint,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    source_mapping jsonb DEFAULT '{}'::jsonb NOT NULL,
    sandboxable boolean DEFAULT false,
    cache_duration_seconds integer DEFAULT 3600,
    proactive_requerying_seconds integer DEFAULT 1800,
    max_limit integer DEFAULT 1000,
    enable_auth boolean DEFAULT false,
    language character varying(255) NOT NULL,
    description character varying(255),
    sandbox_query_id bigint,
    labels text,
    backend_id bigint,
    redact_pii boolean DEFAULT false NOT NULL
);


ALTER TABLE _analytics.endpoint_queries OWNER TO supabase_admin;

--
-- Name: endpoint_queries_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.endpoint_queries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.endpoint_queries_id_seq OWNER TO supabase_admin;

--
-- Name: endpoint_queries_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.endpoint_queries_id_seq OWNED BY _analytics.endpoint_queries.id;


--
-- Name: log_events_115bafa6_1313_4892_afd9_d4b86b567a8d; Type: TABLE; Schema: _analytics; Owner: postgres
--

CREATE TABLE _analytics.log_events_115bafa6_1313_4892_afd9_d4b86b567a8d (
    id text NOT NULL,
    body jsonb,
    event_message text,
    "timestamp" timestamp without time zone
);


ALTER TABLE _analytics.log_events_115bafa6_1313_4892_afd9_d4b86b567a8d OWNER TO postgres;

--
-- Name: log_events_2c06211a_0fc7_43f7_bccf_a2281a24a4a2; Type: TABLE; Schema: _analytics; Owner: postgres
--

CREATE TABLE _analytics.log_events_2c06211a_0fc7_43f7_bccf_a2281a24a4a2 (
    id text NOT NULL,
    body jsonb,
    event_message text,
    "timestamp" timestamp without time zone
);


ALTER TABLE _analytics.log_events_2c06211a_0fc7_43f7_bccf_a2281a24a4a2 OWNER TO postgres;

--
-- Name: log_events_419b59da_0429_45db_9785_88e3dee94993; Type: TABLE; Schema: _analytics; Owner: postgres
--

CREATE TABLE _analytics.log_events_419b59da_0429_45db_9785_88e3dee94993 (
    id text NOT NULL,
    body jsonb,
    event_message text,
    "timestamp" timestamp without time zone
);


ALTER TABLE _analytics.log_events_419b59da_0429_45db_9785_88e3dee94993 OWNER TO postgres;

--
-- Name: log_events_622944ec_b7c6_4aff_b69b_b988f96f119c; Type: TABLE; Schema: _analytics; Owner: postgres
--

CREATE TABLE _analytics.log_events_622944ec_b7c6_4aff_b69b_b988f96f119c (
    id text NOT NULL,
    body jsonb,
    event_message text,
    "timestamp" timestamp without time zone
);


ALTER TABLE _analytics.log_events_622944ec_b7c6_4aff_b69b_b988f96f119c OWNER TO postgres;

--
-- Name: log_events_808408da_588e_4bdd_aa42_de315cdba3d1; Type: TABLE; Schema: _analytics; Owner: postgres
--

CREATE TABLE _analytics.log_events_808408da_588e_4bdd_aa42_de315cdba3d1 (
    id text NOT NULL,
    body jsonb,
    event_message text,
    "timestamp" timestamp without time zone
);


ALTER TABLE _analytics.log_events_808408da_588e_4bdd_aa42_de315cdba3d1 OWNER TO postgres;

--
-- Name: log_events_836026c3_8c63_41fc_a0ed_8cedbd39087b; Type: TABLE; Schema: _analytics; Owner: postgres
--

CREATE TABLE _analytics.log_events_836026c3_8c63_41fc_a0ed_8cedbd39087b (
    id text NOT NULL,
    body jsonb,
    event_message text,
    "timestamp" timestamp without time zone
);


ALTER TABLE _analytics.log_events_836026c3_8c63_41fc_a0ed_8cedbd39087b OWNER TO postgres;

--
-- Name: log_events_9291cb2e_f8eb_4b54_8ce6_5ccc369052b2; Type: TABLE; Schema: _analytics; Owner: postgres
--

CREATE TABLE _analytics.log_events_9291cb2e_f8eb_4b54_8ce6_5ccc369052b2 (
    id text NOT NULL,
    body jsonb,
    event_message text,
    "timestamp" timestamp without time zone
);


ALTER TABLE _analytics.log_events_9291cb2e_f8eb_4b54_8ce6_5ccc369052b2 OWNER TO postgres;

--
-- Name: log_events_d7adc17a_f2cd_45b9_8265_56aacd3bd92a; Type: TABLE; Schema: _analytics; Owner: postgres
--

CREATE TABLE _analytics.log_events_d7adc17a_f2cd_45b9_8265_56aacd3bd92a (
    id text NOT NULL,
    body jsonb,
    event_message text,
    "timestamp" timestamp without time zone
);


ALTER TABLE _analytics.log_events_d7adc17a_f2cd_45b9_8265_56aacd3bd92a OWNER TO postgres;

--
-- Name: log_events_ecbc65d3_371b_4b94_b45f_31bb381e7b40; Type: TABLE; Schema: _analytics; Owner: postgres
--

CREATE TABLE _analytics.log_events_ecbc65d3_371b_4b94_b45f_31bb381e7b40 (
    id text NOT NULL,
    body jsonb,
    event_message text,
    "timestamp" timestamp without time zone
);


ALTER TABLE _analytics.log_events_ecbc65d3_371b_4b94_b45f_31bb381e7b40 OWNER TO postgres;

--
-- Name: oauth_access_grants; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.oauth_access_grants (
    id bigint NOT NULL,
    resource_owner_id integer NOT NULL,
    application_id bigint,
    token character varying(255) NOT NULL,
    expires_in integer NOT NULL,
    redirect_uri text NOT NULL,
    revoked_at timestamp(0) without time zone,
    scopes character varying(255),
    inserted_at timestamp(0) without time zone NOT NULL
);


ALTER TABLE _analytics.oauth_access_grants OWNER TO supabase_admin;

--
-- Name: oauth_access_grants_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.oauth_access_grants_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.oauth_access_grants_id_seq OWNER TO supabase_admin;

--
-- Name: oauth_access_grants_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.oauth_access_grants_id_seq OWNED BY _analytics.oauth_access_grants.id;


--
-- Name: oauth_access_tokens; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.oauth_access_tokens (
    id bigint NOT NULL,
    application_id bigint,
    resource_owner_id integer,
    token character varying(255) NOT NULL,
    refresh_token character varying(255),
    expires_in integer,
    revoked_at timestamp(0) without time zone,
    scopes character varying(255),
    previous_refresh_token character varying(255) DEFAULT ''::character varying NOT NULL,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    description text
);


ALTER TABLE _analytics.oauth_access_tokens OWNER TO supabase_admin;

--
-- Name: oauth_access_tokens_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.oauth_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.oauth_access_tokens_id_seq OWNER TO supabase_admin;

--
-- Name: oauth_access_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.oauth_access_tokens_id_seq OWNED BY _analytics.oauth_access_tokens.id;


--
-- Name: oauth_applications; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.oauth_applications (
    id bigint NOT NULL,
    owner_id integer NOT NULL,
    name character varying(255) NOT NULL,
    uid character varying(255) NOT NULL,
    secret character varying(255) DEFAULT ''::character varying NOT NULL,
    redirect_uri character varying(255) NOT NULL,
    scopes character varying(255) DEFAULT ''::character varying NOT NULL,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


ALTER TABLE _analytics.oauth_applications OWNER TO supabase_admin;

--
-- Name: oauth_applications_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.oauth_applications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.oauth_applications_id_seq OWNER TO supabase_admin;

--
-- Name: oauth_applications_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.oauth_applications_id_seq OWNED BY _analytics.oauth_applications.id;


--
-- Name: partner_users; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.partner_users (
    id bigint NOT NULL,
    partner_id bigint,
    user_id bigint,
    upgraded boolean DEFAULT false NOT NULL
);


ALTER TABLE _analytics.partner_users OWNER TO supabase_admin;

--
-- Name: partner_users_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.partner_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.partner_users_id_seq OWNER TO supabase_admin;

--
-- Name: partner_users_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.partner_users_id_seq OWNED BY _analytics.partner_users.id;


--
-- Name: partners; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.partners (
    id bigint NOT NULL,
    name bytea,
    token bytea
);


ALTER TABLE _analytics.partners OWNER TO supabase_admin;

--
-- Name: partners_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.partners_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.partners_id_seq OWNER TO supabase_admin;

--
-- Name: partners_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.partners_id_seq OWNED BY _analytics.partners.id;


--
-- Name: payment_methods; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.payment_methods (
    id bigint NOT NULL,
    stripe_id character varying(255),
    price_id character varying(255),
    last_four character varying(255),
    brand character varying(255),
    exp_year integer,
    exp_month integer,
    customer_id character varying(255),
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


ALTER TABLE _analytics.payment_methods OWNER TO supabase_admin;

--
-- Name: payment_methods_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.payment_methods_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.payment_methods_id_seq OWNER TO supabase_admin;

--
-- Name: payment_methods_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.payment_methods_id_seq OWNED BY _analytics.payment_methods.id;


--
-- Name: plans; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.plans (
    id bigint NOT NULL,
    name character varying(255),
    stripe_id character varying(255),
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    period character varying(255),
    price integer,
    limit_sources integer,
    limit_rate_limit integer,
    limit_alert_freq integer,
    limit_source_rate_limit integer,
    limit_saved_search_limit integer,
    limit_team_users_limit integer,
    limit_source_fields_limit integer,
    limit_source_ttl bigint DEFAULT 259200000,
    type character varying(255) DEFAULT 'standard'::character varying
);


ALTER TABLE _analytics.plans OWNER TO supabase_admin;

--
-- Name: plans_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.plans_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.plans_id_seq OWNER TO supabase_admin;

--
-- Name: plans_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.plans_id_seq OWNED BY _analytics.plans.id;


--
-- Name: rules; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.rules (
    id bigint NOT NULL,
    regex character varying(255),
    sink uuid,
    source_id bigint NOT NULL,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    regex_struct bytea,
    lql_string text DEFAULT ''::text NOT NULL,
    lql_filters bytea DEFAULT '\x836a'::bytea NOT NULL,
    backend_id bigint,
    token uuid DEFAULT gen_random_uuid()
);

ALTER TABLE ONLY _analytics.rules REPLICA IDENTITY FULL;


ALTER TABLE _analytics.rules OWNER TO supabase_admin;

--
-- Name: rules_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.rules_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.rules_id_seq OWNER TO supabase_admin;

--
-- Name: rules_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.rules_id_seq OWNED BY _analytics.rules.id;


--
-- Name: saved_search_counters; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.saved_search_counters (
    id bigint NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    saved_search_id bigint NOT NULL,
    granularity text DEFAULT 'day'::text NOT NULL,
    non_tailing_count integer,
    tailing_count integer
);


ALTER TABLE _analytics.saved_search_counters OWNER TO supabase_admin;

--
-- Name: saved_search_counters_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.saved_search_counters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.saved_search_counters_id_seq OWNER TO supabase_admin;

--
-- Name: saved_search_counters_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.saved_search_counters_id_seq OWNED BY _analytics.saved_search_counters.id;


--
-- Name: saved_searches; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.saved_searches (
    id bigint NOT NULL,
    querystring text,
    source_id bigint,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    saved_by_user boolean,
    lql_filters jsonb,
    lql_charts jsonb,
    "tailing?" boolean DEFAULT true NOT NULL,
    tailing boolean DEFAULT true NOT NULL
);


ALTER TABLE _analytics.saved_searches OWNER TO supabase_admin;

--
-- Name: saved_searches_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.saved_searches_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.saved_searches_id_seq OWNER TO supabase_admin;

--
-- Name: saved_searches_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.saved_searches_id_seq OWNED BY _analytics.saved_searches.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE _analytics.schema_migrations OWNER TO supabase_admin;

--
-- Name: source_backends; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.source_backends (
    id bigint NOT NULL,
    source_id bigint,
    type character varying(255),
    config jsonb,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


ALTER TABLE _analytics.source_backends OWNER TO supabase_admin;

--
-- Name: source_backends_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.source_backends_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.source_backends_id_seq OWNER TO supabase_admin;

--
-- Name: source_backends_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.source_backends_id_seq OWNED BY _analytics.source_backends.id;


--
-- Name: source_schemas; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.source_schemas (
    id bigint NOT NULL,
    bigquery_schema bytea,
    source_id bigint,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    schema_flat_map bytea
);


ALTER TABLE _analytics.source_schemas OWNER TO supabase_admin;

--
-- Name: source_schemas_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.source_schemas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.source_schemas_id_seq OWNER TO supabase_admin;

--
-- Name: source_schemas_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.source_schemas_id_seq OWNED BY _analytics.source_schemas.id;


--
-- Name: sources; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.sources (
    id bigint NOT NULL,
    name character varying(255),
    token uuid NOT NULL,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    user_id integer NOT NULL,
    public_token character varying(255),
    favorite boolean DEFAULT false NOT NULL,
    bigquery_table_ttl integer,
    api_quota integer DEFAULT 5 NOT NULL,
    webhook_notification_url character varying(255),
    slack_hook_url character varying(255),
    notifications jsonb DEFAULT '{"team_user_ids_for_sms": [], "team_user_ids_for_email": [], "user_text_notifications": false, "user_email_notifications": false, "other_email_notifications": null, "team_user_ids_for_schema_updates": [], "user_schema_update_notifications": true}'::jsonb NOT NULL,
    custom_event_message_keys character varying(255),
    log_events_updated_at timestamp(0) without time zone,
    bigquery_schema bytea,
    notifications_every integer DEFAULT 14400000,
    bq_table_partition_type text,
    lock_schema boolean DEFAULT false,
    validate_schema boolean DEFAULT true,
    drop_lql_filters bytea DEFAULT '\x836a'::bytea NOT NULL,
    drop_lql_string character varying(255),
    v2_pipeline boolean DEFAULT false,
    suggested_keys character varying(255) DEFAULT ''::character varying,
    service_name character varying(255),
    transform_copy_fields character varying(255),
    disable_tailing boolean DEFAULT false,
    bq_storage_write_api boolean DEFAULT false,
    bigquery_clustering_fields character varying(255),
    default_ingest_backend_enabled boolean DEFAULT false
);

ALTER TABLE ONLY _analytics.sources REPLICA IDENTITY FULL;


ALTER TABLE _analytics.sources OWNER TO supabase_admin;

--
-- Name: sources_backends; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.sources_backends (
    id bigint NOT NULL,
    backend_id bigint,
    source_id bigint
);


ALTER TABLE _analytics.sources_backends OWNER TO supabase_admin;

--
-- Name: sources_backends_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.sources_backends_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.sources_backends_id_seq OWNER TO supabase_admin;

--
-- Name: sources_backends_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.sources_backends_id_seq OWNED BY _analytics.sources_backends.id;


--
-- Name: sources_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.sources_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.sources_id_seq OWNER TO supabase_admin;

--
-- Name: sources_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.sources_id_seq OWNED BY _analytics.sources.id;


--
-- Name: system_metrics; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.system_metrics (
    id bigint NOT NULL,
    all_logs_logged bigint,
    node character varying(255),
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


ALTER TABLE _analytics.system_metrics OWNER TO supabase_admin;

--
-- Name: system_metrics_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.system_metrics_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.system_metrics_id_seq OWNER TO supabase_admin;

--
-- Name: system_metrics_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.system_metrics_id_seq OWNED BY _analytics.system_metrics.id;


--
-- Name: team_users; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.team_users (
    id bigint NOT NULL,
    email character varying(255),
    token text,
    provider character varying(255),
    email_preferred character varying(255),
    name character varying(255),
    image character varying(255),
    email_me_product boolean DEFAULT false NOT NULL,
    phone character varying(255),
    valid_google_account boolean DEFAULT false NOT NULL,
    provider_uid text,
    team_id bigint,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    preferences jsonb
);


ALTER TABLE _analytics.team_users OWNER TO supabase_admin;

--
-- Name: team_users_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.team_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.team_users_id_seq OWNER TO supabase_admin;

--
-- Name: team_users_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.team_users_id_seq OWNED BY _analytics.team_users.id;


--
-- Name: teams; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.teams (
    id bigint NOT NULL,
    name character varying(255),
    user_id bigint,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    token character varying(255) DEFAULT gen_random_uuid()
);


ALTER TABLE _analytics.teams OWNER TO supabase_admin;

--
-- Name: teams_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.teams_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.teams_id_seq OWNER TO supabase_admin;

--
-- Name: teams_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.teams_id_seq OWNED BY _analytics.teams.id;


--
-- Name: users; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.users (
    id bigint NOT NULL,
    email character varying(255),
    provider character varying(255) NOT NULL,
    token text NOT NULL,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    api_key character varying(255) NOT NULL,
    old_api_key character varying(255),
    email_preferred character varying(255),
    name character varying(255),
    image character varying(255),
    email_me_product boolean DEFAULT true NOT NULL,
    admin boolean DEFAULT false NOT NULL,
    phone character varying(255),
    bigquery_project_id character varying(255),
    api_quota integer DEFAULT 125 NOT NULL,
    bigquery_dataset_location character varying(255),
    bigquery_dataset_id character varying(255),
    valid_google_account boolean,
    provider_uid text NOT NULL,
    company character varying(255),
    bigquery_udfs_hash character varying(255) DEFAULT ''::character varying NOT NULL,
    bigquery_processed_bytes_limit bigint DEFAULT '10000000000'::bigint NOT NULL,
    "billing_enabled?" boolean DEFAULT false NOT NULL,
    preferences jsonb,
    billing_enabled boolean DEFAULT false NOT NULL,
    endpoints_beta boolean DEFAULT false,
    metadata jsonb,
    partner_upgraded boolean DEFAULT false,
    partner_id bigint,
    bigquery_enable_managed_service_accounts boolean DEFAULT false,
    bigquery_reservation_search character varying(255),
    bigquery_reservation_alerts character varying(255)
);


ALTER TABLE _analytics.users OWNER TO supabase_admin;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.users_id_seq OWNER TO supabase_admin;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.users_id_seq OWNED BY _analytics.users.id;


--
-- Name: vercel_auths; Type: TABLE; Schema: _analytics; Owner: supabase_admin
--

CREATE TABLE _analytics.vercel_auths (
    id bigint NOT NULL,
    access_token character varying(255),
    installation_id character varying(255),
    team_id character varying(255),
    token_type character varying(255),
    vercel_user_id character varying(255),
    user_id bigint,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


ALTER TABLE _analytics.vercel_auths OWNER TO supabase_admin;

--
-- Name: vercel_auths_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: supabase_admin
--

CREATE SEQUENCE _analytics.vercel_auths_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _analytics.vercel_auths_id_seq OWNER TO supabase_admin;

--
-- Name: vercel_auths_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: supabase_admin
--

ALTER SEQUENCE _analytics.vercel_auths_id_seq OWNED BY _analytics.vercel_auths.id;


--
-- Name: alert_queries id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.alert_queries ALTER COLUMN id SET DEFAULT nextval('_analytics.alert_queries_id_seq'::regclass);


--
-- Name: alert_queries_backends id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.alert_queries_backends ALTER COLUMN id SET DEFAULT nextval('_analytics.alert_queries_backends_id_seq'::regclass);


--
-- Name: backends id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.backends ALTER COLUMN id SET DEFAULT nextval('_analytics.backends_id_seq'::regclass);


--
-- Name: billing_accounts id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.billing_accounts ALTER COLUMN id SET DEFAULT nextval('_analytics.billing_accounts_id_seq'::regclass);


--
-- Name: billing_counts id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.billing_counts ALTER COLUMN id SET DEFAULT nextval('_analytics.billing_counts_id_seq'::regclass);


--
-- Name: endpoint_queries id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.endpoint_queries ALTER COLUMN id SET DEFAULT nextval('_analytics.endpoint_queries_id_seq'::regclass);


--
-- Name: oauth_access_grants id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.oauth_access_grants ALTER COLUMN id SET DEFAULT nextval('_analytics.oauth_access_grants_id_seq'::regclass);


--
-- Name: oauth_access_tokens id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.oauth_access_tokens ALTER COLUMN id SET DEFAULT nextval('_analytics.oauth_access_tokens_id_seq'::regclass);


--
-- Name: oauth_applications id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.oauth_applications ALTER COLUMN id SET DEFAULT nextval('_analytics.oauth_applications_id_seq'::regclass);


--
-- Name: partner_users id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.partner_users ALTER COLUMN id SET DEFAULT nextval('_analytics.partner_users_id_seq'::regclass);


--
-- Name: partners id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.partners ALTER COLUMN id SET DEFAULT nextval('_analytics.partners_id_seq'::regclass);


--
-- Name: payment_methods id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.payment_methods ALTER COLUMN id SET DEFAULT nextval('_analytics.payment_methods_id_seq'::regclass);


--
-- Name: plans id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.plans ALTER COLUMN id SET DEFAULT nextval('_analytics.plans_id_seq'::regclass);


--
-- Name: rules id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.rules ALTER COLUMN id SET DEFAULT nextval('_analytics.rules_id_seq'::regclass);


--
-- Name: saved_search_counters id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.saved_search_counters ALTER COLUMN id SET DEFAULT nextval('_analytics.saved_search_counters_id_seq'::regclass);


--
-- Name: saved_searches id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.saved_searches ALTER COLUMN id SET DEFAULT nextval('_analytics.saved_searches_id_seq'::regclass);


--
-- Name: source_backends id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.source_backends ALTER COLUMN id SET DEFAULT nextval('_analytics.source_backends_id_seq'::regclass);


--
-- Name: source_schemas id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.source_schemas ALTER COLUMN id SET DEFAULT nextval('_analytics.source_schemas_id_seq'::regclass);


--
-- Name: sources id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.sources ALTER COLUMN id SET DEFAULT nextval('_analytics.sources_id_seq'::regclass);


--
-- Name: sources_backends id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.sources_backends ALTER COLUMN id SET DEFAULT nextval('_analytics.sources_backends_id_seq'::regclass);


--
-- Name: system_metrics id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.system_metrics ALTER COLUMN id SET DEFAULT nextval('_analytics.system_metrics_id_seq'::regclass);


--
-- Name: team_users id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.team_users ALTER COLUMN id SET DEFAULT nextval('_analytics.team_users_id_seq'::regclass);


--
-- Name: teams id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.teams ALTER COLUMN id SET DEFAULT nextval('_analytics.teams_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.users ALTER COLUMN id SET DEFAULT nextval('_analytics.users_id_seq'::regclass);


--
-- Name: vercel_auths id; Type: DEFAULT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.vercel_auths ALTER COLUMN id SET DEFAULT nextval('_analytics.vercel_auths_id_seq'::regclass);


--
-- Data for Name: alert_queries; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.alert_queries (id, name, token, query, description, language, cron, source_mapping, slack_hook_url, webhook_notification_url, user_id, inserted_at, updated_at) FROM stdin;
\.


--
-- Data for Name: alert_queries_backends; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.alert_queries_backends (id, alert_query_id, backend_id) FROM stdin;
\.


--
-- Data for Name: backends; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.backends (id, name, description, user_id, type, config, inserted_at, updated_at, token, metadata, config_encrypted, default_ingest) FROM stdin;
\.


--
-- Data for Name: billing_accounts; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.billing_accounts (id, latest_successful_stripe_session, stripe_customer, user_id, inserted_at, updated_at, stripe_subscriptions, stripe_invoices, "lifetime_plan?", lifetime_plan_invoice, default_payment_method, custom_invoice_fields, lifetime_plan) FROM stdin;
\.


--
-- Data for Name: billing_counts; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.billing_counts (id, node, count, user_id, source_id, inserted_at, updated_at) FROM stdin;
\.


--
-- Data for Name: endpoint_queries; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.endpoint_queries (id, name, token, query, user_id, inserted_at, updated_at, source_mapping, sandboxable, cache_duration_seconds, proactive_requerying_seconds, max_limit, enable_auth, language, description, sandbox_query_id, labels, backend_id, redact_pii) FROM stdin;
1	logs.all	ad9be4ca-4600-4f1f-828a-1beefb1caa95	with edge_logs as (\nselect \n  t.timestamp,\n  t.id, \n  t.event_message, \n  t.metadata \nfrom `cloudflare.logs.prod` as t\n  cross join unnest(metadata) as m\nwhere\n  -- order of the where clauses matters\n  -- project then timestamp then everything else\n  t.project = @project\n  AND CASE WHEN COALESCE(@iso_timestamp_start, '') = '' THEN  TRUE ELSE  cast(t.timestamp as timestamp) > cast(@iso_timestamp_start as timestamp) END\n  AND CASE WHEN COALESCE(@iso_timestamp_end, '') = '' THEN TRUE ELSE cast(t.timestamp as timestamp) <= cast(@iso_timestamp_end as timestamp) END\norder by\n  cast(t.timestamp as timestamp) desc\n),\n\npostgres_logs as (\n  select \n  t.timestamp,\n  t.id, \n  t.event_message, \n  t.metadata\nfrom `postgres.logs` as t\nwhere\n  -- order of the where clauses matters\n  -- project then timestamp then everything else\n  t.project = @project\n  AND CASE WHEN COALESCE(@iso_timestamp_start, '') = '' THEN  TRUE ELSE  cast(t.timestamp as timestamp) > cast(@iso_timestamp_start as timestamp) END\n  AND CASE WHEN COALESCE(@iso_timestamp_end, '') = '' THEN TRUE ELSE cast(t.timestamp as timestamp) <= cast(@iso_timestamp_end as timestamp) END\n  order by cast(t.timestamp as timestamp) desc\n),\n\nfunction_edge_logs as (\nselect \n  t.timestamp,\n  t.id, \n  t.event_message, \n  t.metadata \nfrom `deno-relay-logs` as t\n  cross join unnest(t.metadata) as m\nwhere\n  CASE WHEN COALESCE(@iso_timestamp_start, '') = '' THEN  TRUE ELSE  cast(t.timestamp as timestamp) > cast(@iso_timestamp_start as timestamp) END\n  AND CASE WHEN COALESCE(@iso_timestamp_end, '') = '' THEN TRUE ELSE cast(t.timestamp as timestamp) <= cast(@iso_timestamp_end as timestamp) END\n  and m.project_ref = @project\norder by cast(t.timestamp as timestamp) desc\n),\n\nfunction_logs as (\nselect \n  t.timestamp,\n  t.id, \n  t.event_message, \n  t.metadata \nfrom `deno-subhosting-events` as t\n  cross join unnest(t.metadata) as m\nwhere\n  -- order of the where clauses matters\n  -- project then timestamp then everything else\n  m.project_ref = @project\n  AND CASE WHEN COALESCE(@iso_timestamp_start, '') = '' THEN  TRUE ELSE  cast(t.timestamp as timestamp) > cast(@iso_timestamp_start as timestamp) END\n  AND CASE WHEN COALESCE(@iso_timestamp_end, '') = '' THEN TRUE ELSE cast(t.timestamp as timestamp) <= cast(@iso_timestamp_end as timestamp) END\norder by cast(t.timestamp as timestamp) desc\n),\n\nauth_logs as (\nselect \n  t.timestamp,\n  t.id, \n  t.event_message, \n  t.metadata \nfrom `gotrue.logs.prod` as t\n  cross join unnest(t.metadata) as m\nwhere\n  -- order of the where clauses matters\n  -- project then timestamp then everything else\n  -- m.project = @project\n  t.project = @project\n  AND CASE WHEN COALESCE(@iso_timestamp_start, '') = '' THEN  TRUE ELSE  cast(t.timestamp as timestamp) > cast(@iso_timestamp_start as timestamp) END\n  AND CASE WHEN COALESCE(@iso_timestamp_end, '') = '' THEN TRUE ELSE cast(t.timestamp as timestamp) <= cast(@iso_timestamp_end as timestamp) END\norder by cast(t.timestamp as timestamp) desc\n),\n\nrealtime_logs as (\nselect \n  t.timestamp,\n  t.id, \n  t.event_message, \n  t.metadata \nfrom `realtime.logs.prod` as t\n  cross join unnest(t.metadata) as m\nwhere\n  m.project = @project \n  AND CASE WHEN COALESCE(@iso_timestamp_start, '') = '' THEN  TRUE ELSE  cast(t.timestamp as timestamp) > cast(@iso_timestamp_start as timestamp) END\n  AND CASE WHEN COALESCE(@iso_timestamp_end, '') = '' THEN TRUE ELSE cast(t.timestamp as timestamp) <= cast(@iso_timestamp_end as timestamp) END\norder by cast(t.timestamp as timestamp) desc\n),\n\nstorage_logs as (\nselect \n  t.timestamp,\n  t.id, \n  t.event_message, \n  t.metadata \nfrom `storage.logs.prod.2` as t\n  cross join unnest(t.metadata) as m\nwhere\n  m.project = @project\n  AND CASE WHEN COALESCE(@iso_timestamp_start, '') = '' THEN  TRUE ELSE  cast(t.timestamp as timestamp) > cast(@iso_timestamp_start as timestamp) END\n  AND CASE WHEN COALESCE(@iso_timestamp_end, '') = '' THEN TRUE ELSE cast(t.timestamp as timestamp) <= cast(@iso_timestamp_end as timestamp) END\norder by cast(t.timestamp as timestamp) desc\n),\n\npostgrest_logs as (\nselect \n  t.timestamp,\n  t.id, \n  t.event_message, \n  t.metadata \nfrom `postgREST.logs.prod` as t\n  cross join unnest(t.metadata) as m\nwhere\n  CASE WHEN COALESCE(@iso_timestamp_start, '') = '' THEN  TRUE ELSE  cast(t.timestamp as timestamp) > cast(@iso_timestamp_start as timestamp) END\n  AND CASE WHEN COALESCE(@iso_timestamp_end, '') = '' THEN TRUE ELSE cast(t.timestamp as timestamp) <= cast(@iso_timestamp_end as timestamp) END\n  AND t.project = @project\norder by cast(t.timestamp as timestamp) desc\n),\n\npgbouncer_logs as (\nselect \n  t.timestamp,\n  t.id, \n  t.event_message, \n  t.metadata \nfrom `pgbouncer.logs.prod` as t\n  cross join unnest(t.metadata) as m\nwhere\n  CASE WHEN COALESCE(@iso_timestamp_start, '') = '' THEN  TRUE ELSE  cast(t.timestamp as timestamp) > cast(@iso_timestamp_start as timestamp) END\n  AND CASE WHEN COALESCE(@iso_timestamp_end, '') = '' THEN TRUE ELSE cast(t.timestamp as timestamp) <= cast(@iso_timestamp_end as timestamp) END\n  AND t.project = @project\norder by cast(t.timestamp as timestamp) desc\n)\n\nSELECT id, timestamp, event_message, metadata\nFROM edge_logs\nLIMIT 100	1	2025-11-08 22:04:13	2025-11-08 22:04:13	{"postgres.logs": "2c06211a-0fc7-43f7-bccf-a2281a24a4a2", "deno-relay-logs": "836026c3-8c63-41fc-a0ed-8cedbd39087b", "gotrue.logs.prod": "ecbc65d3-371b-4b94-b45f-31bb381e7b40", "realtime.logs.prod": "115bafa6-1313-4892-afd9-d4b86b567a8d", "pgbouncer.logs.prod": "622944ec-b7c6-4aff-b69b-b988f96f119c", "postgREST.logs.prod": "808408da-588e-4bdd-aa42-de315cdba3d1", "storage.logs.prod.2": "d7adc17a-f2cd-45b9-8265-56aacd3bd92a", "cloudflare.logs.prod": "419b59da-0429-45db-9785-88e3dee94993", "deno-subhosting-events": "9291cb2e-f8eb-4b54-8ce6-5ccc369052b2"}	t	0	1800	1000	t	bq_sql	\N	\N	\N	\N	f
2	usage.api-counts	6c0fc250-61fe-4cdc-9ff9-dd0c5a527c2e	with \ndates as (\n  select (case\n    when @interval = 'hourly' then timestamp_sub(current_timestamp(), interval 1 hour)\n    when @interval = 'daily' then timestamp_sub(current_timestamp(), interval 7 day)\n    when @interval = 'minutely' then timestamp_sub(current_timestamp(), interval 60 minute)\n  end) as start\n),\nchart_counts as (\nselect\n  (case\n    when @interval = 'hourly' then timestamp_trunc(f0.timestamp,  hour)\n    when @interval = 'daily' then timestamp_trunc(f0.timestamp,  day)\n    when @interval = 'minutely' then timestamp_trunc(f0.timestamp,  minute)\n  end\n  ) as timestamp,\n  COUNTIF(REGEXP_CONTAINS(f2.path, '/rest')) as total_rest_requests,\n  COUNTIF(REGEXP_CONTAINS(f2.path, '/storage')) as total_storage_requests,\n  COUNTIF(REGEXP_CONTAINS(f2.path, '/auth')) as total_auth_requests,\n  COUNTIF(REGEXP_CONTAINS(f2.path, '/realtime')) as total_realtime_requests,\nFROM\n  dates, \n  `cloudflare.logs.prod` as f0\n  LEFT JOIN UNNEST(metadata) AS f1 ON TRUE\n  LEFT JOIN UNNEST(f1.request) AS f2 ON TRUE\nwhere\n  REGEXP_CONTAINS(f2.url, @project) AND f0.timestamp >= dates[0]\n  -- project = @project\nGROUP BY\n    timestamp\n)\nSELECT\n    datetime(chart_counts.timestamp, 'UTC') as timestamp,\n    COALESCE(SUM(chart_counts.total_rest_requests), 0) as total_rest_requests,\n    COALESCE(SUM(chart_counts.total_storage_requests), 0) as total_storage_requests,\n    COALESCE(SUM(chart_counts.total_auth_requests), 0) as total_auth_requests,\n    COALESCE(SUM(chart_counts.total_realtime_requests), 0) as total_realtime_requests,\nFROM  \n  chart_counts\nGROUP BY\n    timestamp\nORDER BY\n    timestamp asc;	1	2025-11-08 22:04:13	2025-11-08 22:04:13	{"cloudflare.logs.prod": "419b59da-0429-45db-9785-88e3dee94993"}	t	900	300	1000	t	bq_sql	\N	\N	\N	\N	f
\.


--
-- Data for Name: log_events_115bafa6_1313_4892_afd9_d4b86b567a8d; Type: TABLE DATA; Schema: _analytics; Owner: postgres
--

COPY _analytics.log_events_115bafa6_1313_4892_afd9_d4b86b567a8d (id, body, event_message, "timestamp") FROM stdin;
\.


--
-- Data for Name: log_events_2c06211a_0fc7_43f7_bccf_a2281a24a4a2; Type: TABLE DATA; Schema: _analytics; Owner: postgres
--

COPY _analytics.log_events_2c06211a_0fc7_43f7_bccf_a2281a24a4a2 (id, body, event_message, "timestamp") FROM stdin;
\.


--
-- Data for Name: log_events_419b59da_0429_45db_9785_88e3dee94993; Type: TABLE DATA; Schema: _analytics; Owner: postgres
--

COPY _analytics.log_events_419b59da_0429_45db_9785_88e3dee94993 (id, body, event_message, "timestamp") FROM stdin;
\.


--
-- Data for Name: log_events_622944ec_b7c6_4aff_b69b_b988f96f119c; Type: TABLE DATA; Schema: _analytics; Owner: postgres
--

COPY _analytics.log_events_622944ec_b7c6_4aff_b69b_b988f96f119c (id, body, event_message, "timestamp") FROM stdin;
\.


--
-- Data for Name: log_events_808408da_588e_4bdd_aa42_de315cdba3d1; Type: TABLE DATA; Schema: _analytics; Owner: postgres
--

COPY _analytics.log_events_808408da_588e_4bdd_aa42_de315cdba3d1 (id, body, event_message, "timestamp") FROM stdin;
\.


--
-- Data for Name: log_events_836026c3_8c63_41fc_a0ed_8cedbd39087b; Type: TABLE DATA; Schema: _analytics; Owner: postgres
--

COPY _analytics.log_events_836026c3_8c63_41fc_a0ed_8cedbd39087b (id, body, event_message, "timestamp") FROM stdin;
\.


--
-- Data for Name: log_events_9291cb2e_f8eb_4b54_8ce6_5ccc369052b2; Type: TABLE DATA; Schema: _analytics; Owner: postgres
--

COPY _analytics.log_events_9291cb2e_f8eb_4b54_8ce6_5ccc369052b2 (id, body, event_message, "timestamp") FROM stdin;
\.


--
-- Data for Name: log_events_d7adc17a_f2cd_45b9_8265_56aacd3bd92a; Type: TABLE DATA; Schema: _analytics; Owner: postgres
--

COPY _analytics.log_events_d7adc17a_f2cd_45b9_8265_56aacd3bd92a (id, body, event_message, "timestamp") FROM stdin;
\.


--
-- Data for Name: log_events_ecbc65d3_371b_4b94_b45f_31bb381e7b40; Type: TABLE DATA; Schema: _analytics; Owner: postgres
--

COPY _analytics.log_events_ecbc65d3_371b_4b94_b45f_31bb381e7b40 (id, body, event_message, "timestamp") FROM stdin;
\.


--
-- Data for Name: oauth_access_grants; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.oauth_access_grants (id, resource_owner_id, application_id, token, expires_in, redirect_uri, revoked_at, scopes, inserted_at) FROM stdin;
\.


--
-- Data for Name: oauth_access_tokens; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.oauth_access_tokens (id, application_id, resource_owner_id, token, refresh_token, expires_in, revoked_at, scopes, previous_refresh_token, inserted_at, updated_at, description) FROM stdin;
1	\N	1	api-key	\N	\N	\N	private		2025-11-08 22:04:13	2025-11-08 22:04:13	LOGFLARE_PRIVATE_ACCESS_TOKEN
\.


--
-- Data for Name: oauth_applications; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.oauth_applications (id, owner_id, name, uid, secret, redirect_uri, scopes, inserted_at, updated_at) FROM stdin;
\.


--
-- Data for Name: partner_users; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.partner_users (id, partner_id, user_id, upgraded) FROM stdin;
\.


--
-- Data for Name: partners; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.partners (id, name, token) FROM stdin;
\.


--
-- Data for Name: payment_methods; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.payment_methods (id, stripe_id, price_id, last_four, brand, exp_year, exp_month, customer_id, inserted_at, updated_at) FROM stdin;
\.


--
-- Data for Name: plans; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.plans (id, name, stripe_id, inserted_at, updated_at, period, price, limit_sources, limit_rate_limit, limit_alert_freq, limit_source_rate_limit, limit_saved_search_limit, limit_team_users_limit, limit_source_fields_limit, limit_source_ttl, type) FROM stdin;
1	Enterprise	\N	2025-11-08 22:04:13	2025-11-08 22:04:13	year	20000	500	500000	1000	100000	1	2	500	5184000000	standard
\.


--
-- Data for Name: rules; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.rules (id, regex, sink, source_id, inserted_at, updated_at, regex_struct, lql_string, lql_filters, backend_id, token) FROM stdin;
\.


--
-- Data for Name: saved_search_counters; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.saved_search_counters (id, "timestamp", saved_search_id, granularity, non_tailing_count, tailing_count) FROM stdin;
\.


--
-- Data for Name: saved_searches; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.saved_searches (id, querystring, source_id, inserted_at, updated_at, saved_by_user, lql_filters, lql_charts, "tailing?", tailing) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.schema_migrations (version, inserted_at) FROM stdin;
20181212161742	2025-11-08 22:04:01
20181212220417	2025-11-08 22:04:01
20181212220843	2025-11-08 22:04:01
20181219123536	2025-11-08 22:04:01
20181220234951	2025-11-08 22:04:01
20190111193432	2025-11-08 22:04:01
20190111222747	2025-11-08 22:04:01
20190111223908	2025-11-08 22:04:01
20190128145905	2025-11-08 22:04:01
20190211145604	2025-11-08 22:04:01
20190211215002	2025-11-08 22:04:01
20190212190412	2025-11-08 22:04:01
20190218171231	2025-11-08 22:04:01
20190220020658	2025-11-08 22:04:01
20190220150309	2025-11-08 22:04:01
20190226224323	2025-11-08 22:04:01
20190226225345	2025-11-08 22:04:01
20190313222100	2025-11-08 22:04:01
20190314210542	2025-11-08 22:04:01
20190314234158	2025-11-08 22:04:01
20190321135403	2025-11-08 22:04:01
20190322184724	2025-11-08 22:04:01
20190322194928	2025-11-08 22:04:01
20190326182605	2025-11-08 22:04:01
20190507163835	2025-11-08 22:04:01
20190509154645	2025-11-08 22:04:01
20190522200854	2025-11-08 22:04:01
20190528132518	2025-11-08 22:04:01
20190603134249	2025-11-08 22:04:01
20190604130811	2025-11-08 22:04:01
20190814185734	2025-11-08 22:04:02
20190815222912	2025-11-08 22:04:02
20190820170701	2025-11-08 22:04:02
20190823211533	2025-11-08 22:04:02
20190912214717	2025-11-08 22:04:02
20191007163747	2025-11-08 22:04:02
20191014233159	2025-11-08 22:04:02
20191108163345	2025-11-08 22:04:02
20191111221000	2025-11-08 22:04:02
20191114120409	2025-11-08 22:04:02
20191226181646	2025-11-08 22:04:02
20191230164304	2025-11-08 22:04:02
20200106161131	2025-11-08 22:04:02
20200109165508	2025-11-08 22:04:02
20200113132611	2025-11-08 22:04:02
20200114231904	2025-11-08 22:04:02
20200116122225	2025-11-08 22:04:02
20200116143027	2025-11-08 22:04:02
20200130185455	2025-11-08 22:04:02
20200205180641	2025-11-08 22:04:02
20200311175358	2025-11-08 22:04:02
20200317130710	2025-11-08 22:04:02
20200319164038	2025-11-08 22:04:02
20200320161900	2025-11-08 22:04:02
20200401102642	2025-11-08 22:04:02
20200401132720	2025-11-08 22:04:02
20200401182732	2025-11-08 22:04:02
20200402180315	2025-11-08 22:04:02
20200403130311	2025-11-08 22:04:02
20200409120508	2025-11-08 22:04:02
20200409150827	2025-11-08 22:04:02
20200413161605	2025-11-08 22:04:02
20200422211654	2025-11-08 22:04:02
20200507184618	2025-11-08 22:04:02
20200512205718	2025-11-08 22:04:02
20200513154911	2025-11-08 22:04:02
20200519181117	2025-11-08 22:04:02
20200603150413	2025-11-08 22:04:02
20200605164057	2025-11-08 22:04:02
20200605185446	2025-11-08 22:04:02
20200606140153	2025-11-08 22:04:02
20200803211251	2025-11-08 22:04:02
20200806201742	2025-11-08 22:04:02
20200824155733	2025-11-08 22:04:02
20200826141015	2025-11-08 22:04:02
20201130170051	2025-11-08 22:04:02
20201211125013	2025-11-08 22:04:02
20201229174131	2025-11-08 22:04:02
20210104192144	2025-11-08 22:04:02
20210106205729	2025-11-08 22:04:02
20210118220058	2025-11-08 22:04:02
20210121220159	2025-11-08 22:04:02
20210204203050	2025-11-08 22:04:02
20210215163446	2025-11-08 22:04:02
20210215165548	2025-11-08 22:04:02
20210322193905	2025-11-08 22:04:02
20210521142331	2025-11-08 22:04:02
20210526120333	2025-11-08 22:04:02
20210707201854	2025-11-08 22:04:02
20210712201152	2025-11-08 22:04:02
20210715022534	2025-11-08 22:04:02
20210728172720	2025-11-08 22:04:02
20210729161959	2025-11-08 22:04:02
20210802194723	2025-11-08 22:04:02
20210803020354	2025-11-08 22:04:02
20210804210634	2025-11-08 22:04:02
20210810182003	2025-11-08 22:04:02
20210830181842	2025-11-08 22:04:02
20211027175016	2025-11-08 22:04:02
20211122181200	2025-11-08 22:04:02
20211123192744	2025-11-08 22:04:02
20211130190948	2025-11-08 22:04:02
20211130201505	2025-11-08 22:04:02
20220310172806	2025-11-08 22:04:02
20220523135557	2025-11-08 22:04:02
20220524125216	2025-11-08 22:04:02
20220707030041	2025-11-08 22:04:02
20220714033012	2025-11-08 22:04:02
20220803211705	2025-11-08 22:04:02
20221210010955	2025-11-08 22:04:02
20221210011115	2025-11-08 22:04:02
20230110121321	2025-11-08 22:04:02
20230206155428	2025-11-08 22:04:02
20230223162441	2025-11-08 22:04:02
20230227183828	2025-11-08 22:04:02
20230622160150	2025-11-08 22:04:02
20230622160250	2025-11-08 22:04:02
20230714041101	2025-11-08 22:04:02
20230727111150	2025-11-08 22:04:02
20230807162746	2025-11-08 22:04:02
20230911181436	2025-11-08 22:04:02
20231023174255	2025-11-08 22:04:02
20231027221103	2025-11-08 22:04:02
20231207113137	2025-11-08 22:04:02
20231213013433	2025-11-08 22:04:02
20240214170611	2025-11-08 22:04:02
20240219101411	2025-11-08 22:04:02
20240223104413	2025-11-08 22:04:02
20240327073534	2025-11-08 22:04:02
20240429194758	2025-11-08 22:04:02
20240708025030	2025-11-08 22:04:02
20240725033149	2025-11-08 22:04:02
20240725083359	2025-11-08 22:04:02
20240802110527	2025-11-08 22:04:02
20240806105357	2025-11-08 22:04:02
20240808172408	2025-11-08 22:04:02
20241121183147	2025-11-08 22:04:02
20241204120824	2025-11-08 22:04:02
20250203131456	2025-11-08 22:04:02
20250221154207	2025-11-08 22:04:02
20250224140820	2025-11-08 22:04:03
20250422145132	2025-11-08 22:04:03
20250507072233	2025-11-08 22:04:03
20250518215453	2025-11-08 22:04:03
20250605124931	2025-11-08 22:04:03
20250617074424	2025-11-08 22:04:03
20250617075400	2025-11-08 22:04:03
20250630074142	2025-11-08 22:04:03
20250702081228	2025-11-08 22:04:03
20250709072539	2025-11-08 22:04:03
20250710164717	2025-11-08 22:04:03
20250804174212	2025-11-08 22:04:03
20250804175351	2025-11-08 22:04:03
20250902185149	2025-11-08 22:04:03
20250922180823	2025-11-08 22:04:03
\.


--
-- Data for Name: source_backends; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.source_backends (id, source_id, type, config, inserted_at, updated_at) FROM stdin;
\.


--
-- Data for Name: source_schemas; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.source_schemas (id, bigquery_schema, source_id, inserted_at, updated_at, schema_flat_map) FROM stdin;
\.


--
-- Data for Name: sources; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.sources (id, name, token, inserted_at, updated_at, user_id, public_token, favorite, bigquery_table_ttl, api_quota, webhook_notification_url, slack_hook_url, notifications, custom_event_message_keys, log_events_updated_at, bigquery_schema, notifications_every, bq_table_partition_type, lock_schema, validate_schema, drop_lql_filters, drop_lql_string, v2_pipeline, suggested_keys, service_name, transform_copy_fields, disable_tailing, bq_storage_write_api, bigquery_clustering_fields, default_ingest_backend_enabled) FROM stdin;
1	cloudflare.logs.prod	419b59da-0429-45db-9785-88e3dee94993	2025-11-08 22:04:13	2025-11-08 22:04:13	1	\N	f	\N	25	\N	\N	{"team_user_ids_for_sms": [], "team_user_ids_for_email": [], "user_text_notifications": false, "user_email_notifications": false, "other_email_notifications": null, "team_user_ids_for_schema_updates": [], "user_schema_update_notifications": true}	\N	\N	\N	14400000	timestamp	f	t	\\x836a	\N	f		\N	\N	f	f	\N	f
2	postgres.logs	2c06211a-0fc7-43f7-bccf-a2281a24a4a2	2025-11-08 22:04:13	2025-11-08 22:04:13	1	\N	f	\N	25	\N	\N	{"team_user_ids_for_sms": [], "team_user_ids_for_email": [], "user_text_notifications": false, "user_email_notifications": false, "other_email_notifications": null, "team_user_ids_for_schema_updates": [], "user_schema_update_notifications": true}	\N	\N	\N	14400000	timestamp	f	t	\\x836a	\N	f		\N	\N	f	f	\N	f
3	deno-relay-logs	836026c3-8c63-41fc-a0ed-8cedbd39087b	2025-11-08 22:04:13	2025-11-08 22:04:13	1	\N	f	\N	25	\N	\N	{"team_user_ids_for_sms": [], "team_user_ids_for_email": [], "user_text_notifications": false, "user_email_notifications": false, "other_email_notifications": null, "team_user_ids_for_schema_updates": [], "user_schema_update_notifications": true}	\N	\N	\N	14400000	timestamp	f	t	\\x836a	\N	f		\N	\N	f	f	\N	f
4	deno-subhosting-events	9291cb2e-f8eb-4b54-8ce6-5ccc369052b2	2025-11-08 22:04:13	2025-11-08 22:04:13	1	\N	f	\N	25	\N	\N	{"team_user_ids_for_sms": [], "team_user_ids_for_email": [], "user_text_notifications": false, "user_email_notifications": false, "other_email_notifications": null, "team_user_ids_for_schema_updates": [], "user_schema_update_notifications": true}	\N	\N	\N	14400000	timestamp	f	t	\\x836a	\N	f		\N	\N	f	f	\N	f
5	gotrue.logs.prod	ecbc65d3-371b-4b94-b45f-31bb381e7b40	2025-11-08 22:04:13	2025-11-08 22:04:13	1	\N	f	\N	25	\N	\N	{"team_user_ids_for_sms": [], "team_user_ids_for_email": [], "user_text_notifications": false, "user_email_notifications": false, "other_email_notifications": null, "team_user_ids_for_schema_updates": [], "user_schema_update_notifications": true}	\N	\N	\N	14400000	timestamp	f	t	\\x836a	\N	f		\N	\N	f	f	\N	f
6	realtime.logs.prod	115bafa6-1313-4892-afd9-d4b86b567a8d	2025-11-08 22:04:13	2025-11-08 22:04:13	1	\N	f	\N	25	\N	\N	{"team_user_ids_for_sms": [], "team_user_ids_for_email": [], "user_text_notifications": false, "user_email_notifications": false, "other_email_notifications": null, "team_user_ids_for_schema_updates": [], "user_schema_update_notifications": true}	\N	\N	\N	14400000	timestamp	f	t	\\x836a	\N	f		\N	\N	f	f	\N	f
7	storage.logs.prod.2	d7adc17a-f2cd-45b9-8265-56aacd3bd92a	2025-11-08 22:04:13	2025-11-08 22:04:13	1	\N	f	\N	25	\N	\N	{"team_user_ids_for_sms": [], "team_user_ids_for_email": [], "user_text_notifications": false, "user_email_notifications": false, "other_email_notifications": null, "team_user_ids_for_schema_updates": [], "user_schema_update_notifications": true}	\N	\N	\N	14400000	timestamp	f	t	\\x836a	\N	f		\N	\N	f	f	\N	f
8	postgREST.logs.prod	808408da-588e-4bdd-aa42-de315cdba3d1	2025-11-08 22:04:13	2025-11-08 22:04:13	1	\N	f	\N	25	\N	\N	{"team_user_ids_for_sms": [], "team_user_ids_for_email": [], "user_text_notifications": false, "user_email_notifications": false, "other_email_notifications": null, "team_user_ids_for_schema_updates": [], "user_schema_update_notifications": true}	\N	\N	\N	14400000	timestamp	f	t	\\x836a	\N	f		\N	\N	f	f	\N	f
9	pgbouncer.logs.prod	622944ec-b7c6-4aff-b69b-b988f96f119c	2025-11-08 22:04:13	2025-11-08 22:04:13	1	\N	f	\N	25	\N	\N	{"team_user_ids_for_sms": [], "team_user_ids_for_email": [], "user_text_notifications": false, "user_email_notifications": false, "other_email_notifications": null, "team_user_ids_for_schema_updates": [], "user_schema_update_notifications": true}	\N	\N	\N	14400000	timestamp	f	t	\\x836a	\N	f		\N	\N	f	f	\N	f
\.


--
-- Data for Name: sources_backends; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.sources_backends (id, backend_id, source_id) FROM stdin;
\.


--
-- Data for Name: system_metrics; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.system_metrics (id, all_logs_logged, node, inserted_at, updated_at) FROM stdin;
1	0	logflare@127.0.0.1	2025-11-08 22:04:18	2025-11-08 22:04:18
\.


--
-- Data for Name: team_users; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.team_users (id, email, token, provider, email_preferred, name, image, email_me_product, phone, valid_google_account, provider_uid, team_id, inserted_at, updated_at, preferences) FROM stdin;
\.


--
-- Data for Name: teams; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.teams (id, name, user_id, inserted_at, updated_at, token) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.users (id, email, provider, token, inserted_at, updated_at, api_key, old_api_key, email_preferred, name, image, email_me_product, admin, phone, bigquery_project_id, api_quota, bigquery_dataset_location, bigquery_dataset_id, valid_google_account, provider_uid, company, bigquery_udfs_hash, bigquery_processed_bytes_limit, "billing_enabled?", preferences, billing_enabled, endpoints_beta, metadata, partner_upgraded, partner_id, bigquery_enable_managed_service_accounts, bigquery_reservation_search, bigquery_reservation_alerts) FROM stdin;
1	default@logflare.app	default	20c0ca07-8558-402f-8905-7fb48e3a6205	2025-11-08 22:04:13	2025-11-08 22:04:13	5vuEGylI-MwU	\N	default@logflare.app	default	\N	f	f	\N	\N	150	\N	\N	\N	default	\N		10000000000	f	\N	t	t	\N	f	\N	f	\N	\N
\.


--
-- Data for Name: vercel_auths; Type: TABLE DATA; Schema: _analytics; Owner: supabase_admin
--

COPY _analytics.vercel_auths (id, access_token, installation_id, team_id, token_type, vercel_user_id, user_id, inserted_at, updated_at) FROM stdin;
\.


--
-- Name: alert_queries_backends_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.alert_queries_backends_id_seq', 1, false);


--
-- Name: alert_queries_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.alert_queries_id_seq', 1, false);


--
-- Name: backends_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.backends_id_seq', 1, false);


--
-- Name: billing_accounts_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.billing_accounts_id_seq', 1, false);


--
-- Name: billing_counts_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.billing_counts_id_seq', 1, false);


--
-- Name: endpoint_queries_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.endpoint_queries_id_seq', 2, true);


--
-- Name: oauth_access_grants_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.oauth_access_grants_id_seq', 1, false);


--
-- Name: oauth_access_tokens_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.oauth_access_tokens_id_seq', 1, true);


--
-- Name: oauth_applications_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.oauth_applications_id_seq', 1, false);


--
-- Name: partner_users_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.partner_users_id_seq', 1, false);


--
-- Name: partners_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.partners_id_seq', 1, false);


--
-- Name: payment_methods_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.payment_methods_id_seq', 1, false);


--
-- Name: plans_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.plans_id_seq', 1, true);


--
-- Name: rules_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.rules_id_seq', 1, false);


--
-- Name: saved_search_counters_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.saved_search_counters_id_seq', 1, false);


--
-- Name: saved_searches_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.saved_searches_id_seq', 1, false);


--
-- Name: source_backends_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.source_backends_id_seq', 1, false);


--
-- Name: source_schemas_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.source_schemas_id_seq', 1, false);


--
-- Name: sources_backends_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.sources_backends_id_seq', 1, false);


--
-- Name: sources_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.sources_id_seq', 9, true);


--
-- Name: system_metrics_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.system_metrics_id_seq', 1, true);


--
-- Name: team_users_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.team_users_id_seq', 1, false);


--
-- Name: teams_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.teams_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.users_id_seq', 3, true);


--
-- Name: vercel_auths_id_seq; Type: SEQUENCE SET; Schema: _analytics; Owner: supabase_admin
--

SELECT pg_catalog.setval('_analytics.vercel_auths_id_seq', 1, false);


--
-- Name: alert_queries_backends alert_queries_backends_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.alert_queries_backends
    ADD CONSTRAINT alert_queries_backends_pkey PRIMARY KEY (id);


--
-- Name: alert_queries alert_queries_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.alert_queries
    ADD CONSTRAINT alert_queries_pkey PRIMARY KEY (id);


--
-- Name: backends backends_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.backends
    ADD CONSTRAINT backends_pkey PRIMARY KEY (id);


--
-- Name: billing_accounts billing_accounts_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.billing_accounts
    ADD CONSTRAINT billing_accounts_pkey PRIMARY KEY (id);


--
-- Name: billing_counts billing_counts_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.billing_counts
    ADD CONSTRAINT billing_counts_pkey PRIMARY KEY (id);


--
-- Name: endpoint_queries endpoint_queries_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.endpoint_queries
    ADD CONSTRAINT endpoint_queries_pkey PRIMARY KEY (id);


--
-- Name: log_events_115bafa6_1313_4892_afd9_d4b86b567a8d log_events_115bafa6_1313_4892_afd9_d4b86b567a8d_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: postgres
--

ALTER TABLE ONLY _analytics.log_events_115bafa6_1313_4892_afd9_d4b86b567a8d
    ADD CONSTRAINT log_events_115bafa6_1313_4892_afd9_d4b86b567a8d_pkey PRIMARY KEY (id);


--
-- Name: log_events_2c06211a_0fc7_43f7_bccf_a2281a24a4a2 log_events_2c06211a_0fc7_43f7_bccf_a2281a24a4a2_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: postgres
--

ALTER TABLE ONLY _analytics.log_events_2c06211a_0fc7_43f7_bccf_a2281a24a4a2
    ADD CONSTRAINT log_events_2c06211a_0fc7_43f7_bccf_a2281a24a4a2_pkey PRIMARY KEY (id);


--
-- Name: log_events_419b59da_0429_45db_9785_88e3dee94993 log_events_419b59da_0429_45db_9785_88e3dee94993_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: postgres
--

ALTER TABLE ONLY _analytics.log_events_419b59da_0429_45db_9785_88e3dee94993
    ADD CONSTRAINT log_events_419b59da_0429_45db_9785_88e3dee94993_pkey PRIMARY KEY (id);


--
-- Name: log_events_622944ec_b7c6_4aff_b69b_b988f96f119c log_events_622944ec_b7c6_4aff_b69b_b988f96f119c_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: postgres
--

ALTER TABLE ONLY _analytics.log_events_622944ec_b7c6_4aff_b69b_b988f96f119c
    ADD CONSTRAINT log_events_622944ec_b7c6_4aff_b69b_b988f96f119c_pkey PRIMARY KEY (id);


--
-- Name: log_events_808408da_588e_4bdd_aa42_de315cdba3d1 log_events_808408da_588e_4bdd_aa42_de315cdba3d1_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: postgres
--

ALTER TABLE ONLY _analytics.log_events_808408da_588e_4bdd_aa42_de315cdba3d1
    ADD CONSTRAINT log_events_808408da_588e_4bdd_aa42_de315cdba3d1_pkey PRIMARY KEY (id);


--
-- Name: log_events_836026c3_8c63_41fc_a0ed_8cedbd39087b log_events_836026c3_8c63_41fc_a0ed_8cedbd39087b_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: postgres
--

ALTER TABLE ONLY _analytics.log_events_836026c3_8c63_41fc_a0ed_8cedbd39087b
    ADD CONSTRAINT log_events_836026c3_8c63_41fc_a0ed_8cedbd39087b_pkey PRIMARY KEY (id);


--
-- Name: log_events_9291cb2e_f8eb_4b54_8ce6_5ccc369052b2 log_events_9291cb2e_f8eb_4b54_8ce6_5ccc369052b2_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: postgres
--

ALTER TABLE ONLY _analytics.log_events_9291cb2e_f8eb_4b54_8ce6_5ccc369052b2
    ADD CONSTRAINT log_events_9291cb2e_f8eb_4b54_8ce6_5ccc369052b2_pkey PRIMARY KEY (id);


--
-- Name: log_events_d7adc17a_f2cd_45b9_8265_56aacd3bd92a log_events_d7adc17a_f2cd_45b9_8265_56aacd3bd92a_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: postgres
--

ALTER TABLE ONLY _analytics.log_events_d7adc17a_f2cd_45b9_8265_56aacd3bd92a
    ADD CONSTRAINT log_events_d7adc17a_f2cd_45b9_8265_56aacd3bd92a_pkey PRIMARY KEY (id);


--
-- Name: log_events_ecbc65d3_371b_4b94_b45f_31bb381e7b40 log_events_ecbc65d3_371b_4b94_b45f_31bb381e7b40_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: postgres
--

ALTER TABLE ONLY _analytics.log_events_ecbc65d3_371b_4b94_b45f_31bb381e7b40
    ADD CONSTRAINT log_events_ecbc65d3_371b_4b94_b45f_31bb381e7b40_pkey PRIMARY KEY (id);


--
-- Name: oauth_access_grants oauth_access_grants_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.oauth_access_grants
    ADD CONSTRAINT oauth_access_grants_pkey PRIMARY KEY (id);


--
-- Name: oauth_access_tokens oauth_access_tokens_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.oauth_access_tokens
    ADD CONSTRAINT oauth_access_tokens_pkey PRIMARY KEY (id);


--
-- Name: oauth_applications oauth_applications_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.oauth_applications
    ADD CONSTRAINT oauth_applications_pkey PRIMARY KEY (id);


--
-- Name: partner_users partner_users_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.partner_users
    ADD CONSTRAINT partner_users_pkey PRIMARY KEY (id);


--
-- Name: partners partners_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.partners
    ADD CONSTRAINT partners_pkey PRIMARY KEY (id);


--
-- Name: payment_methods payment_methods_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.payment_methods
    ADD CONSTRAINT payment_methods_pkey PRIMARY KEY (id);


--
-- Name: plans plans_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.plans
    ADD CONSTRAINT plans_pkey PRIMARY KEY (id);


--
-- Name: rules rules_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.rules
    ADD CONSTRAINT rules_pkey PRIMARY KEY (id);


--
-- Name: saved_search_counters saved_search_counters_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.saved_search_counters
    ADD CONSTRAINT saved_search_counters_pkey PRIMARY KEY (id);


--
-- Name: saved_searches saved_searches_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.saved_searches
    ADD CONSTRAINT saved_searches_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: source_backends source_backends_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.source_backends
    ADD CONSTRAINT source_backends_pkey PRIMARY KEY (id);


--
-- Name: source_schemas source_schemas_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.source_schemas
    ADD CONSTRAINT source_schemas_pkey PRIMARY KEY (id);


--
-- Name: sources_backends sources_backends_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.sources_backends
    ADD CONSTRAINT sources_backends_pkey PRIMARY KEY (id);


--
-- Name: sources sources_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.sources
    ADD CONSTRAINT sources_pkey PRIMARY KEY (id);


--
-- Name: system_metrics system_metrics_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.system_metrics
    ADD CONSTRAINT system_metrics_pkey PRIMARY KEY (id);


--
-- Name: team_users team_users_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.team_users
    ADD CONSTRAINT team_users_pkey PRIMARY KEY (id);


--
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: vercel_auths vercel_auths_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.vercel_auths
    ADD CONSTRAINT vercel_auths_pkey PRIMARY KEY (id);


--
-- Name: alert_queries_backends_alert_query_id_backend_id_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE UNIQUE INDEX alert_queries_backends_alert_query_id_backend_id_index ON _analytics.alert_queries_backends USING btree (alert_query_id, backend_id);


--
-- Name: alert_queries_token_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE UNIQUE INDEX alert_queries_token_index ON _analytics.alert_queries USING btree (token);


--
-- Name: alert_queries_user_id_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE INDEX alert_queries_user_id_index ON _analytics.alert_queries USING btree (user_id);


--
-- Name: billing_accounts_stripe_customer_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE UNIQUE INDEX billing_accounts_stripe_customer_index ON _analytics.billing_accounts USING btree (stripe_customer);


--
-- Name: billing_accounts_user_id_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE UNIQUE INDEX billing_accounts_user_id_index ON _analytics.billing_accounts USING btree (user_id);


--
-- Name: billing_counts_inserted_at_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE INDEX billing_counts_inserted_at_index ON _analytics.billing_counts USING btree (inserted_at);


--
-- Name: billing_counts_source_id_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE INDEX billing_counts_source_id_index ON _analytics.billing_counts USING btree (source_id);


--
-- Name: billing_counts_user_id_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE INDEX billing_counts_user_id_index ON _analytics.billing_counts USING btree (user_id);


--
-- Name: endpoint_queries_backend_id_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE INDEX endpoint_queries_backend_id_index ON _analytics.endpoint_queries USING btree (backend_id);


--
-- Name: endpoint_queries_token_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE UNIQUE INDEX endpoint_queries_token_index ON _analytics.endpoint_queries USING btree (token);


--
-- Name: endpoint_queries_user_id_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE INDEX endpoint_queries_user_id_index ON _analytics.endpoint_queries USING btree (user_id);


--
-- Name: idx_backends_default_ingest; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE INDEX idx_backends_default_ingest ON _analytics.backends USING btree (default_ingest) WHERE (default_ingest = true);


--
-- Name: log_events_115bafa6_1313_4892_afd9_d4b86b567a8d_timestamp_brin_; Type: INDEX; Schema: _analytics; Owner: postgres
--

CREATE INDEX log_events_115bafa6_1313_4892_afd9_d4b86b567a8d_timestamp_brin_ ON _analytics.log_events_115bafa6_1313_4892_afd9_d4b86b567a8d USING brin ("timestamp");


--
-- Name: log_events_2c06211a_0fc7_43f7_bccf_a2281a24a4a2_timestamp_brin_; Type: INDEX; Schema: _analytics; Owner: postgres
--

CREATE INDEX log_events_2c06211a_0fc7_43f7_bccf_a2281a24a4a2_timestamp_brin_ ON _analytics.log_events_2c06211a_0fc7_43f7_bccf_a2281a24a4a2 USING brin ("timestamp");


--
-- Name: log_events_419b59da_0429_45db_9785_88e3dee94993_timestamp_brin_; Type: INDEX; Schema: _analytics; Owner: postgres
--

CREATE INDEX log_events_419b59da_0429_45db_9785_88e3dee94993_timestamp_brin_ ON _analytics.log_events_419b59da_0429_45db_9785_88e3dee94993 USING brin ("timestamp");


--
-- Name: log_events_622944ec_b7c6_4aff_b69b_b988f96f119c_timestamp_brin_; Type: INDEX; Schema: _analytics; Owner: postgres
--

CREATE INDEX log_events_622944ec_b7c6_4aff_b69b_b988f96f119c_timestamp_brin_ ON _analytics.log_events_622944ec_b7c6_4aff_b69b_b988f96f119c USING brin ("timestamp");


--
-- Name: log_events_808408da_588e_4bdd_aa42_de315cdba3d1_timestamp_brin_; Type: INDEX; Schema: _analytics; Owner: postgres
--

CREATE INDEX log_events_808408da_588e_4bdd_aa42_de315cdba3d1_timestamp_brin_ ON _analytics.log_events_808408da_588e_4bdd_aa42_de315cdba3d1 USING brin ("timestamp");


--
-- Name: log_events_836026c3_8c63_41fc_a0ed_8cedbd39087b_timestamp_brin_; Type: INDEX; Schema: _analytics; Owner: postgres
--

CREATE INDEX log_events_836026c3_8c63_41fc_a0ed_8cedbd39087b_timestamp_brin_ ON _analytics.log_events_836026c3_8c63_41fc_a0ed_8cedbd39087b USING brin ("timestamp");


--
-- Name: log_events_9291cb2e_f8eb_4b54_8ce6_5ccc369052b2_timestamp_brin_; Type: INDEX; Schema: _analytics; Owner: postgres
--

CREATE INDEX log_events_9291cb2e_f8eb_4b54_8ce6_5ccc369052b2_timestamp_brin_ ON _analytics.log_events_9291cb2e_f8eb_4b54_8ce6_5ccc369052b2 USING brin ("timestamp");


--
-- Name: log_events_d7adc17a_f2cd_45b9_8265_56aacd3bd92a_timestamp_brin_; Type: INDEX; Schema: _analytics; Owner: postgres
--

CREATE INDEX log_events_d7adc17a_f2cd_45b9_8265_56aacd3bd92a_timestamp_brin_ ON _analytics.log_events_d7adc17a_f2cd_45b9_8265_56aacd3bd92a USING brin ("timestamp");


--
-- Name: log_events_ecbc65d3_371b_4b94_b45f_31bb381e7b40_timestamp_brin_; Type: INDEX; Schema: _analytics; Owner: postgres
--

CREATE INDEX log_events_ecbc65d3_371b_4b94_b45f_31bb381e7b40_timestamp_brin_ ON _analytics.log_events_ecbc65d3_371b_4b94_b45f_31bb381e7b40 USING brin ("timestamp");


--
-- Name: oauth_access_grants_token_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE UNIQUE INDEX oauth_access_grants_token_index ON _analytics.oauth_access_grants USING btree (token);


--
-- Name: oauth_access_tokens_refresh_token_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE UNIQUE INDEX oauth_access_tokens_refresh_token_index ON _analytics.oauth_access_tokens USING btree (refresh_token);


--
-- Name: oauth_access_tokens_resource_owner_id_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE INDEX oauth_access_tokens_resource_owner_id_index ON _analytics.oauth_access_tokens USING btree (resource_owner_id);


--
-- Name: oauth_access_tokens_token_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE UNIQUE INDEX oauth_access_tokens_token_index ON _analytics.oauth_access_tokens USING btree (token);


--
-- Name: oauth_applications_owner_id_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE INDEX oauth_applications_owner_id_index ON _analytics.oauth_applications USING btree (owner_id);


--
-- Name: oauth_applications_uid_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE UNIQUE INDEX oauth_applications_uid_index ON _analytics.oauth_applications USING btree (uid);


--
-- Name: partner_users_partner_id_user_id_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE UNIQUE INDEX partner_users_partner_id_user_id_index ON _analytics.partner_users USING btree (partner_id, user_id);


--
-- Name: partner_users_partner_id_user_id_upgraded_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE INDEX partner_users_partner_id_user_id_upgraded_index ON _analytics.partner_users USING btree (partner_id, user_id, upgraded);


--
-- Name: payment_methods_customer_id_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE INDEX payment_methods_customer_id_index ON _analytics.payment_methods USING btree (customer_id);


--
-- Name: payment_methods_stripe_id_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE UNIQUE INDEX payment_methods_stripe_id_index ON _analytics.payment_methods USING btree (stripe_id);


--
-- Name: rules_source_id_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE INDEX rules_source_id_index ON _analytics.rules USING btree (source_id);


--
-- Name: rules_token_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE UNIQUE INDEX rules_token_index ON _analytics.rules USING btree (token);


--
-- Name: saved_search_counters_timestamp_saved_search_id_granularity_ind; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE UNIQUE INDEX saved_search_counters_timestamp_saved_search_id_granularity_ind ON _analytics.saved_search_counters USING btree ("timestamp", saved_search_id, granularity);


--
-- Name: saved_searches_querystring_source_id_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE UNIQUE INDEX saved_searches_querystring_source_id_index ON _analytics.saved_searches USING btree (querystring, source_id);


--
-- Name: source_schemas_source_id_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE UNIQUE INDEX source_schemas_source_id_index ON _analytics.source_schemas USING btree (source_id);


--
-- Name: sources_name_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE UNIQUE INDEX sources_name_index ON _analytics.sources USING btree (id, name);


--
-- Name: sources_public_token_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE UNIQUE INDEX sources_public_token_index ON _analytics.sources USING btree (public_token);


--
-- Name: sources_token_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE UNIQUE INDEX sources_token_index ON _analytics.sources USING btree (token);


--
-- Name: sources_user_id_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE INDEX sources_user_id_index ON _analytics.sources USING btree (user_id);


--
-- Name: system_metrics_node_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE INDEX system_metrics_node_index ON _analytics.system_metrics USING btree (node);


--
-- Name: team_users_provider_uid_team_id_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE UNIQUE INDEX team_users_provider_uid_team_id_index ON _analytics.team_users USING btree (provider_uid, team_id);


--
-- Name: team_users_team_id_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE INDEX team_users_team_id_index ON _analytics.team_users USING btree (team_id);


--
-- Name: teams_token_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE UNIQUE INDEX teams_token_index ON _analytics.teams USING btree (token);


--
-- Name: teams_user_id_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE UNIQUE INDEX teams_user_id_index ON _analytics.teams USING btree (user_id);


--
-- Name: users_api_key_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE INDEX users_api_key_index ON _analytics.users USING btree (api_key);


--
-- Name: users_lower_email_index; Type: INDEX; Schema: _analytics; Owner: supabase_admin
--

CREATE UNIQUE INDEX users_lower_email_index ON _analytics.users USING btree (lower((email)::text));


--
-- Name: alert_queries_backends alert_queries_backends_alert_query_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.alert_queries_backends
    ADD CONSTRAINT alert_queries_backends_alert_query_id_fkey FOREIGN KEY (alert_query_id) REFERENCES _analytics.alert_queries(id) ON DELETE CASCADE;


--
-- Name: alert_queries_backends alert_queries_backends_backend_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.alert_queries_backends
    ADD CONSTRAINT alert_queries_backends_backend_id_fkey FOREIGN KEY (backend_id) REFERENCES _analytics.backends(id) ON DELETE CASCADE;


--
-- Name: alert_queries alert_queries_user_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.alert_queries
    ADD CONSTRAINT alert_queries_user_id_fkey FOREIGN KEY (user_id) REFERENCES _analytics.users(id) ON DELETE CASCADE;


--
-- Name: backends backends_user_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.backends
    ADD CONSTRAINT backends_user_id_fkey FOREIGN KEY (user_id) REFERENCES _analytics.users(id);


--
-- Name: billing_accounts billing_accounts_user_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.billing_accounts
    ADD CONSTRAINT billing_accounts_user_id_fkey FOREIGN KEY (user_id) REFERENCES _analytics.users(id) ON DELETE CASCADE;


--
-- Name: billing_counts billing_counts_user_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.billing_counts
    ADD CONSTRAINT billing_counts_user_id_fkey FOREIGN KEY (user_id) REFERENCES _analytics.users(id) ON DELETE CASCADE;


--
-- Name: endpoint_queries endpoint_queries_backend_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.endpoint_queries
    ADD CONSTRAINT endpoint_queries_backend_id_fkey FOREIGN KEY (backend_id) REFERENCES _analytics.backends(id) ON DELETE SET NULL;


--
-- Name: endpoint_queries endpoint_queries_sandbox_query_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.endpoint_queries
    ADD CONSTRAINT endpoint_queries_sandbox_query_id_fkey FOREIGN KEY (sandbox_query_id) REFERENCES _analytics.endpoint_queries(id);


--
-- Name: endpoint_queries endpoint_queries_user_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.endpoint_queries
    ADD CONSTRAINT endpoint_queries_user_id_fkey FOREIGN KEY (user_id) REFERENCES _analytics.users(id) ON DELETE CASCADE;


--
-- Name: oauth_access_grants oauth_access_grants_application_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.oauth_access_grants
    ADD CONSTRAINT oauth_access_grants_application_id_fkey FOREIGN KEY (application_id) REFERENCES _analytics.oauth_applications(id);


--
-- Name: oauth_access_tokens oauth_access_tokens_application_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.oauth_access_tokens
    ADD CONSTRAINT oauth_access_tokens_application_id_fkey FOREIGN KEY (application_id) REFERENCES _analytics.oauth_applications(id);


--
-- Name: partner_users partner_users_partner_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.partner_users
    ADD CONSTRAINT partner_users_partner_id_fkey FOREIGN KEY (partner_id) REFERENCES _analytics.partners(id);


--
-- Name: partner_users partner_users_user_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.partner_users
    ADD CONSTRAINT partner_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES _analytics.users(id) ON DELETE CASCADE;


--
-- Name: payment_methods payment_methods_customer_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.payment_methods
    ADD CONSTRAINT payment_methods_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES _analytics.billing_accounts(stripe_customer) ON DELETE CASCADE;


--
-- Name: rules rules_backend_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.rules
    ADD CONSTRAINT rules_backend_id_fkey FOREIGN KEY (backend_id) REFERENCES _analytics.backends(id) ON DELETE CASCADE;


--
-- Name: rules rules_sink_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.rules
    ADD CONSTRAINT rules_sink_fkey FOREIGN KEY (sink) REFERENCES _analytics.sources(token) ON DELETE CASCADE;


--
-- Name: rules rules_source_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.rules
    ADD CONSTRAINT rules_source_id_fkey FOREIGN KEY (source_id) REFERENCES _analytics.sources(id) ON DELETE CASCADE;


--
-- Name: saved_search_counters saved_search_counters_saved_search_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.saved_search_counters
    ADD CONSTRAINT saved_search_counters_saved_search_id_fkey FOREIGN KEY (saved_search_id) REFERENCES _analytics.saved_searches(id) ON DELETE CASCADE;


--
-- Name: saved_searches saved_searches_source_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.saved_searches
    ADD CONSTRAINT saved_searches_source_id_fkey FOREIGN KEY (source_id) REFERENCES _analytics.sources(id) ON DELETE CASCADE;


--
-- Name: source_backends source_backends_source_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.source_backends
    ADD CONSTRAINT source_backends_source_id_fkey FOREIGN KEY (source_id) REFERENCES _analytics.sources(id);


--
-- Name: source_schemas source_schemas_source_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.source_schemas
    ADD CONSTRAINT source_schemas_source_id_fkey FOREIGN KEY (source_id) REFERENCES _analytics.sources(id) ON DELETE CASCADE;


--
-- Name: sources_backends sources_backends_backend_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.sources_backends
    ADD CONSTRAINT sources_backends_backend_id_fkey FOREIGN KEY (backend_id) REFERENCES _analytics.backends(id);


--
-- Name: sources_backends sources_backends_source_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.sources_backends
    ADD CONSTRAINT sources_backends_source_id_fkey FOREIGN KEY (source_id) REFERENCES _analytics.sources(id);


--
-- Name: sources sources_user_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.sources
    ADD CONSTRAINT sources_user_id_fkey FOREIGN KEY (user_id) REFERENCES _analytics.users(id) ON DELETE CASCADE;


--
-- Name: team_users team_users_team_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.team_users
    ADD CONSTRAINT team_users_team_id_fkey FOREIGN KEY (team_id) REFERENCES _analytics.teams(id) ON DELETE CASCADE;


--
-- Name: teams teams_user_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.teams
    ADD CONSTRAINT teams_user_id_fkey FOREIGN KEY (user_id) REFERENCES _analytics.users(id) ON DELETE CASCADE;


--
-- Name: users users_partner_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.users
    ADD CONSTRAINT users_partner_id_fkey FOREIGN KEY (partner_id) REFERENCES _analytics.partners(id);


--
-- Name: vercel_auths vercel_auths_user_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: supabase_admin
--

ALTER TABLE ONLY _analytics.vercel_auths
    ADD CONSTRAINT vercel_auths_user_id_fkey FOREIGN KEY (user_id) REFERENCES _analytics.users(id) ON DELETE CASCADE;


--
-- Name: logflare_pub; Type: PUBLICATION; Schema: -; Owner: supabase_admin
--

CREATE PUBLICATION logflare_pub WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION logflare_pub OWNER TO supabase_admin;

--
-- Name: logflare_pub backends; Type: PUBLICATION TABLE; Schema: _analytics; Owner: supabase_admin
--

ALTER PUBLICATION logflare_pub ADD TABLE ONLY _analytics.backends;


--
-- Name: logflare_pub billing_accounts; Type: PUBLICATION TABLE; Schema: _analytics; Owner: supabase_admin
--

ALTER PUBLICATION logflare_pub ADD TABLE ONLY _analytics.billing_accounts;


--
-- Name: logflare_pub oauth_access_tokens; Type: PUBLICATION TABLE; Schema: _analytics; Owner: supabase_admin
--

ALTER PUBLICATION logflare_pub ADD TABLE ONLY _analytics.oauth_access_tokens;


--
-- Name: logflare_pub plans; Type: PUBLICATION TABLE; Schema: _analytics; Owner: supabase_admin
--

ALTER PUBLICATION logflare_pub ADD TABLE ONLY _analytics.plans;


--
-- Name: logflare_pub rules; Type: PUBLICATION TABLE; Schema: _analytics; Owner: supabase_admin
--

ALTER PUBLICATION logflare_pub ADD TABLE ONLY _analytics.rules;


--
-- Name: logflare_pub source_schemas; Type: PUBLICATION TABLE; Schema: _analytics; Owner: supabase_admin
--

ALTER PUBLICATION logflare_pub ADD TABLE ONLY _analytics.source_schemas;


--
-- Name: logflare_pub sources; Type: PUBLICATION TABLE; Schema: _analytics; Owner: supabase_admin
--

ALTER PUBLICATION logflare_pub ADD TABLE ONLY _analytics.sources;


--
-- Name: logflare_pub team_users; Type: PUBLICATION TABLE; Schema: _analytics; Owner: supabase_admin
--

ALTER PUBLICATION logflare_pub ADD TABLE ONLY _analytics.team_users;


--
-- Name: logflare_pub users; Type: PUBLICATION TABLE; Schema: _analytics; Owner: supabase_admin
--

ALTER PUBLICATION logflare_pub ADD TABLE ONLY _analytics.users;


--
-- PostgreSQL database dump complete
--

\unrestrict U8Imk6duUyam0AiLgHVus614FYq9iFUJYQ9W5Udi5S4EAUfZEDIbum83Syrde1p

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

\restrict aWRxthXstb5ZqSiRwjz1mgSYNdeAjj93lIwMTUVAwkj5xxyBQMRKYp3pd5iqjol

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: _realtime; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA _realtime;


ALTER SCHEMA _realtime OWNER TO postgres;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- Name: pg_net; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_net; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_net IS 'Async HTTP';


--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- Name: supabase_functions; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA supabase_functions;


ALTER SCHEMA supabase_functions OWNER TO supabase_admin;

--
-- Name: supabase_migrations; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA supabase_migrations;


ALTER SCHEMA supabase_migrations OWNER TO postgres;

--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_authorization_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_authorization_status AS ENUM (
    'pending',
    'approved',
    'denied',
    'expired'
);


ALTER TYPE auth.oauth_authorization_status OWNER TO supabase_auth_admin;

--
-- Name: oauth_client_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_client_type AS ENUM (
    'public',
    'confidential'
);


ALTER TYPE auth.oauth_client_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_registration_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_registration_type AS ENUM (
    'dynamic',
    'manual'
);


ALTER TYPE auth.oauth_registration_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_response_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_response_type AS ENUM (
    'code'
);


ALTER TYPE auth.oauth_response_type OWNER TO supabase_auth_admin;

--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- Name: app_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.app_role AS ENUM (
    'admin',
    'teacher',
    'student'
);


ALTER TYPE public.app_role OWNER TO postgres;

--
-- Name: education_level; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.education_level AS ENUM (
    'preescolar',
    'primaria',
    'secundaria',
    'bachillerato'
);


ALTER TYPE public.education_level OWNER TO postgres;

--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- Name: buckettype; Type: TYPE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TYPE storage.buckettype AS ENUM (
    'STANDARD',
    'ANALYTICS'
);


ALTER TYPE storage.buckettype OWNER TO supabase_storage_admin;

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
    ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

    ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
    ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

    REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
    REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

    GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: supabase_admin
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $_$
begin
    raise debug 'PgBouncer auth request: %', p_usename;

    return query
    select 
        rolname::text, 
        case when rolvaliduntil < now() 
            then null 
            else rolpassword::text 
        end 
    from pg_authid 
    where rolname=$1 and rolcanlogin;
end;
$_$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO supabase_admin;

--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_;

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_admin;

--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    declare
      res jsonb;
    begin
      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;
      return res;
    end
    $$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  BEGIN
    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (payload, event, topic, private, extension)
    VALUES (payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      RAISE WARNING 'ErrorSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- Name: add_prefixes(text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.add_prefixes(_bucket_id text, _name text) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    prefixes text[];
BEGIN
    prefixes := "storage"."get_prefixes"("_name");

    IF array_length(prefixes, 1) > 0 THEN
        INSERT INTO storage.prefixes (name, bucket_id)
        SELECT UNNEST(prefixes) as name, "_bucket_id" ON CONFLICT DO NOTHING;
    END IF;
END;
$$;


ALTER FUNCTION storage.add_prefixes(_bucket_id text, _name text) OWNER TO supabase_storage_admin;

--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- Name: delete_leaf_prefixes(text[], text[]); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.delete_leaf_prefixes(bucket_ids text[], names text[]) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_rows_deleted integer;
BEGIN
    LOOP
        WITH candidates AS (
            SELECT DISTINCT
                t.bucket_id,
                unnest(storage.get_prefixes(t.name)) AS name
            FROM unnest(bucket_ids, names) AS t(bucket_id, name)
        ),
        uniq AS (
             SELECT
                 bucket_id,
                 name,
                 storage.get_level(name) AS level
             FROM candidates
             WHERE name <> ''
             GROUP BY bucket_id, name
        ),
        leaf AS (
             SELECT
                 p.bucket_id,
                 p.name,
                 p.level
             FROM storage.prefixes AS p
                  JOIN uniq AS u
                       ON u.bucket_id = p.bucket_id
                           AND u.name = p.name
                           AND u.level = p.level
             WHERE NOT EXISTS (
                 SELECT 1
                 FROM storage.objects AS o
                 WHERE o.bucket_id = p.bucket_id
                   AND o.level = p.level + 1
                   AND o.name COLLATE "C" LIKE p.name || '/%'
             )
             AND NOT EXISTS (
                 SELECT 1
                 FROM storage.prefixes AS c
                 WHERE c.bucket_id = p.bucket_id
                   AND c.level = p.level + 1
                   AND c.name COLLATE "C" LIKE p.name || '/%'
             )
        )
        DELETE
        FROM storage.prefixes AS p
            USING leaf AS l
        WHERE p.bucket_id = l.bucket_id
          AND p.name = l.name
          AND p.level = l.level;

        GET DIAGNOSTICS v_rows_deleted = ROW_COUNT;
        EXIT WHEN v_rows_deleted = 0;
    END LOOP;
END;
$$;


ALTER FUNCTION storage.delete_leaf_prefixes(bucket_ids text[], names text[]) OWNER TO supabase_storage_admin;

--
-- Name: delete_prefix(text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.delete_prefix(_bucket_id text, _name text) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    -- Check if we can delete the prefix
    IF EXISTS(
        SELECT FROM "storage"."prefixes"
        WHERE "prefixes"."bucket_id" = "_bucket_id"
          AND level = "storage"."get_level"("_name") + 1
          AND "prefixes"."name" COLLATE "C" LIKE "_name" || '/%'
        LIMIT 1
    )
    OR EXISTS(
        SELECT FROM "storage"."objects"
        WHERE "objects"."bucket_id" = "_bucket_id"
          AND "storage"."get_level"("objects"."name") = "storage"."get_level"("_name") + 1
          AND "objects"."name" COLLATE "C" LIKE "_name" || '/%'
        LIMIT 1
    ) THEN
    -- There are sub-objects, skip deletion
    RETURN false;
    ELSE
        DELETE FROM "storage"."prefixes"
        WHERE "prefixes"."bucket_id" = "_bucket_id"
          AND level = "storage"."get_level"("_name")
          AND "prefixes"."name" = "_name";
        RETURN true;
    END IF;
END;
$$;


ALTER FUNCTION storage.delete_prefix(_bucket_id text, _name text) OWNER TO supabase_storage_admin;

--
-- Name: delete_prefix_hierarchy_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.delete_prefix_hierarchy_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    prefix text;
BEGIN
    prefix := "storage"."get_prefix"(OLD."name");

    IF coalesce(prefix, '') != '' THEN
        PERFORM "storage"."delete_prefix"(OLD."bucket_id", prefix);
    END IF;

    RETURN OLD;
END;
$$;


ALTER FUNCTION storage.delete_prefix_hierarchy_trigger() OWNER TO supabase_storage_admin;

--
-- Name: enforce_bucket_name_length(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.enforce_bucket_name_length() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
    if length(new.name) > 100 then
        raise exception 'bucket name "%" is too long (% characters). Max is 100.', new.name, length(new.name);
    end if;
    return new;
end;
$$;


ALTER FUNCTION storage.enforce_bucket_name_length() OWNER TO supabase_storage_admin;

--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
    _filename text;
BEGIN
    SELECT string_to_array(name, '/') INTO _parts;
    SELECT _parts[array_length(_parts,1)] INTO _filename;
    RETURN reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
BEGIN
    -- Split on "/" to get path segments
    SELECT string_to_array(name, '/') INTO _parts;
    -- Return everything except the last segment
    RETURN _parts[1 : array_length(_parts,1) - 1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_level(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_level(name text) RETURNS integer
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
SELECT array_length(string_to_array("name", '/'), 1);
$$;


ALTER FUNCTION storage.get_level(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_prefix(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_prefix(name text) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
SELECT
    CASE WHEN strpos("name", '/') > 0 THEN
             regexp_replace("name", '[\/]{1}[^\/]+\/?$', '')
         ELSE
             ''
        END;
$_$;


ALTER FUNCTION storage.get_prefix(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_prefixes(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_prefixes(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $$
DECLARE
    parts text[];
    prefixes text[];
    prefix text;
BEGIN
    -- Split the name into parts by '/'
    parts := string_to_array("name", '/');
    prefixes := '{}';

    -- Construct the prefixes, stopping one level below the last part
    FOR i IN 1..array_length(parts, 1) - 1 LOOP
            prefix := array_to_string(parts[1:i], '/');
            prefixes := array_append(prefixes, prefix);
    END LOOP;

    RETURN prefixes;
END;
$$;


ALTER FUNCTION storage.get_prefixes(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::bigint) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(name COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))
                    ELSE
                        name
                END AS name, id, metadata, updated_at
            FROM
                storage.objects
            WHERE
                bucket_id = $5 AND
                name ILIKE $1 || ''%'' AND
                CASE
                    WHEN $6 != '''' THEN
                    name COLLATE "C" > $6
                ELSE true END
                AND CASE
                    WHEN $4 != '''' THEN
                        CASE
                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                name COLLATE "C" > $4
                            END
                    ELSE
                        true
                END
            ORDER BY
                name COLLATE "C" ASC) as e order by name COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) OWNER TO supabase_storage_admin;

--
-- Name: lock_top_prefixes(text[], text[]); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.lock_top_prefixes(bucket_ids text[], names text[]) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_bucket text;
    v_top text;
BEGIN
    FOR v_bucket, v_top IN
        SELECT DISTINCT t.bucket_id,
            split_part(t.name, '/', 1) AS top
        FROM unnest(bucket_ids, names) AS t(bucket_id, name)
        WHERE t.name <> ''
        ORDER BY 1, 2
        LOOP
            PERFORM pg_advisory_xact_lock(hashtextextended(v_bucket || '/' || v_top, 0));
        END LOOP;
END;
$$;


ALTER FUNCTION storage.lock_top_prefixes(bucket_ids text[], names text[]) OWNER TO supabase_storage_admin;

--
-- Name: objects_delete_cleanup(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_delete_cleanup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_bucket_ids text[];
    v_names      text[];
BEGIN
    IF current_setting('storage.gc.prefixes', true) = '1' THEN
        RETURN NULL;
    END IF;

    PERFORM set_config('storage.gc.prefixes', '1', true);

    SELECT COALESCE(array_agg(d.bucket_id), '{}'),
           COALESCE(array_agg(d.name), '{}')
    INTO v_bucket_ids, v_names
    FROM deleted AS d
    WHERE d.name <> '';

    PERFORM storage.lock_top_prefixes(v_bucket_ids, v_names);
    PERFORM storage.delete_leaf_prefixes(v_bucket_ids, v_names);

    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.objects_delete_cleanup() OWNER TO supabase_storage_admin;

--
-- Name: objects_insert_prefix_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_insert_prefix_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    NEW.level := "storage"."get_level"(NEW."name");

    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_insert_prefix_trigger() OWNER TO supabase_storage_admin;

--
-- Name: objects_update_cleanup(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_update_cleanup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    -- NEW - OLD (destinations to create prefixes for)
    v_add_bucket_ids text[];
    v_add_names      text[];

    -- OLD - NEW (sources to prune)
    v_src_bucket_ids text[];
    v_src_names      text[];
BEGIN
    IF TG_OP <> 'UPDATE' THEN
        RETURN NULL;
    END IF;

    -- 1) Compute NEW−OLD (added paths) and OLD−NEW (moved-away paths)
    WITH added AS (
        SELECT n.bucket_id, n.name
        FROM new_rows n
        WHERE n.name <> '' AND position('/' in n.name) > 0
        EXCEPT
        SELECT o.bucket_id, o.name FROM old_rows o WHERE o.name <> ''
    ),
    moved AS (
         SELECT o.bucket_id, o.name
         FROM old_rows o
         WHERE o.name <> ''
         EXCEPT
         SELECT n.bucket_id, n.name FROM new_rows n WHERE n.name <> ''
    )
    SELECT
        -- arrays for ADDED (dest) in stable order
        COALESCE( (SELECT array_agg(a.bucket_id ORDER BY a.bucket_id, a.name) FROM added a), '{}' ),
        COALESCE( (SELECT array_agg(a.name      ORDER BY a.bucket_id, a.name) FROM added a), '{}' ),
        -- arrays for MOVED (src) in stable order
        COALESCE( (SELECT array_agg(m.bucket_id ORDER BY m.bucket_id, m.name) FROM moved m), '{}' ),
        COALESCE( (SELECT array_agg(m.name      ORDER BY m.bucket_id, m.name) FROM moved m), '{}' )
    INTO v_add_bucket_ids, v_add_names, v_src_bucket_ids, v_src_names;

    -- Nothing to do?
    IF (array_length(v_add_bucket_ids, 1) IS NULL) AND (array_length(v_src_bucket_ids, 1) IS NULL) THEN
        RETURN NULL;
    END IF;

    -- 2) Take per-(bucket, top) locks: ALL prefixes in consistent global order to prevent deadlocks
    DECLARE
        v_all_bucket_ids text[];
        v_all_names text[];
    BEGIN
        -- Combine source and destination arrays for consistent lock ordering
        v_all_bucket_ids := COALESCE(v_src_bucket_ids, '{}') || COALESCE(v_add_bucket_ids, '{}');
        v_all_names := COALESCE(v_src_names, '{}') || COALESCE(v_add_names, '{}');

        -- Single lock call ensures consistent global ordering across all transactions
        IF array_length(v_all_bucket_ids, 1) IS NOT NULL THEN
            PERFORM storage.lock_top_prefixes(v_all_bucket_ids, v_all_names);
        END IF;
    END;

    -- 3) Create destination prefixes (NEW−OLD) BEFORE pruning sources
    IF array_length(v_add_bucket_ids, 1) IS NOT NULL THEN
        WITH candidates AS (
            SELECT DISTINCT t.bucket_id, unnest(storage.get_prefixes(t.name)) AS name
            FROM unnest(v_add_bucket_ids, v_add_names) AS t(bucket_id, name)
            WHERE name <> ''
        )
        INSERT INTO storage.prefixes (bucket_id, name)
        SELECT c.bucket_id, c.name
        FROM candidates c
        ON CONFLICT DO NOTHING;
    END IF;

    -- 4) Prune source prefixes bottom-up for OLD−NEW
    IF array_length(v_src_bucket_ids, 1) IS NOT NULL THEN
        -- re-entrancy guard so DELETE on prefixes won't recurse
        IF current_setting('storage.gc.prefixes', true) <> '1' THEN
            PERFORM set_config('storage.gc.prefixes', '1', true);
        END IF;

        PERFORM storage.delete_leaf_prefixes(v_src_bucket_ids, v_src_names);
    END IF;

    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.objects_update_cleanup() OWNER TO supabase_storage_admin;

--
-- Name: objects_update_level_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_update_level_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Ensure this is an update operation and the name has changed
    IF TG_OP = 'UPDATE' AND (NEW."name" <> OLD."name" OR NEW."bucket_id" <> OLD."bucket_id") THEN
        -- Set the new level
        NEW."level" := "storage"."get_level"(NEW."name");
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_update_level_trigger() OWNER TO supabase_storage_admin;

--
-- Name: objects_update_prefix_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_update_prefix_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    old_prefixes TEXT[];
BEGIN
    -- Ensure this is an update operation and the name has changed
    IF TG_OP = 'UPDATE' AND (NEW."name" <> OLD."name" OR NEW."bucket_id" <> OLD."bucket_id") THEN
        -- Retrieve old prefixes
        old_prefixes := "storage"."get_prefixes"(OLD."name");

        -- Remove old prefixes that are only used by this object
        WITH all_prefixes as (
            SELECT unnest(old_prefixes) as prefix
        ),
        can_delete_prefixes as (
             SELECT prefix
             FROM all_prefixes
             WHERE NOT EXISTS (
                 SELECT 1 FROM "storage"."objects"
                 WHERE "bucket_id" = OLD."bucket_id"
                   AND "name" <> OLD."name"
                   AND "name" LIKE (prefix || '%')
             )
         )
        DELETE FROM "storage"."prefixes" WHERE name IN (SELECT prefix FROM can_delete_prefixes);

        -- Add new prefixes
        PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    END IF;
    -- Set the new level
    NEW."level" := "storage"."get_level"(NEW."name");

    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_update_prefix_trigger() OWNER TO supabase_storage_admin;

--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- Name: prefixes_delete_cleanup(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.prefixes_delete_cleanup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_bucket_ids text[];
    v_names      text[];
BEGIN
    IF current_setting('storage.gc.prefixes', true) = '1' THEN
        RETURN NULL;
    END IF;

    PERFORM set_config('storage.gc.prefixes', '1', true);

    SELECT COALESCE(array_agg(d.bucket_id), '{}'),
           COALESCE(array_agg(d.name), '{}')
    INTO v_bucket_ids, v_names
    FROM deleted AS d
    WHERE d.name <> '';

    PERFORM storage.lock_top_prefixes(v_bucket_ids, v_names);
    PERFORM storage.delete_leaf_prefixes(v_bucket_ids, v_names);

    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.prefixes_delete_cleanup() OWNER TO supabase_storage_admin;

--
-- Name: prefixes_insert_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.prefixes_insert_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.prefixes_insert_trigger() OWNER TO supabase_storage_admin;

--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql
    AS $$
declare
    can_bypass_rls BOOLEAN;
begin
    SELECT rolbypassrls
    INTO can_bypass_rls
    FROM pg_roles
    WHERE rolname = coalesce(nullif(current_setting('role', true), 'none'), current_user);

    IF can_bypass_rls THEN
        RETURN QUERY SELECT * FROM storage.search_v1_optimised(prefix, bucketname, limits, levels, offsets, search, sortcolumn, sortorder);
    ELSE
        RETURN QUERY SELECT * FROM storage.search_legacy_v1(prefix, bucketname, limits, levels, offsets, search, sortcolumn, sortorder);
    END IF;
end;
$$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_legacy_v1(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_legacy_v1(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
    v_order_by text;
    v_sort_order text;
begin
    case
        when sortcolumn = 'name' then
            v_order_by = 'name';
        when sortcolumn = 'updated_at' then
            v_order_by = 'updated_at';
        when sortcolumn = 'created_at' then
            v_order_by = 'created_at';
        when sortcolumn = 'last_accessed_at' then
            v_order_by = 'last_accessed_at';
        else
            v_order_by = 'name';
        end case;

    case
        when sortorder = 'asc' then
            v_sort_order = 'asc';
        when sortorder = 'desc' then
            v_sort_order = 'desc';
        else
            v_sort_order = 'asc';
        end case;

    v_order_by = v_order_by || ' ' || v_sort_order;

    return query execute
        'with folders as (
           select path_tokens[$1] as folder
           from storage.objects
             where objects.name ilike $2 || $3 || ''%''
               and bucket_id = $4
               and array_length(objects.path_tokens, 1) <> $1
           group by folder
           order by folder ' || v_sort_order || '
     )
     (select folder as "name",
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search_legacy_v1(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_v1_optimised(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_v1_optimised(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
    v_order_by text;
    v_sort_order text;
begin
    case
        when sortcolumn = 'name' then
            v_order_by = 'name';
        when sortcolumn = 'updated_at' then
            v_order_by = 'updated_at';
        when sortcolumn = 'created_at' then
            v_order_by = 'created_at';
        when sortcolumn = 'last_accessed_at' then
            v_order_by = 'last_accessed_at';
        else
            v_order_by = 'name';
        end case;

    case
        when sortorder = 'asc' then
            v_sort_order = 'asc';
        when sortorder = 'desc' then
            v_sort_order = 'desc';
        else
            v_sort_order = 'asc';
        end case;

    v_order_by = v_order_by || ' ' || v_sort_order;

    return query execute
        'with folders as (
           select (string_to_array(name, ''/''))[level] as name
           from storage.prefixes
             where lower(prefixes.name) like lower($2 || $3) || ''%''
               and bucket_id = $4
               and level = $1
           order by name ' || v_sort_order || '
     )
     (select name,
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[level] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where lower(objects.name) like lower($2 || $3) || ''%''
       and bucket_id = $4
       and level = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search_v1_optimised(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_v2(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer DEFAULT 100, levels integer DEFAULT 1, start_after text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text, sort_column text DEFAULT 'name'::text, sort_column_after text DEFAULT ''::text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    sort_col text;
    sort_ord text;
    cursor_op text;
    cursor_expr text;
    sort_expr text;
BEGIN
    -- Validate sort_order
    sort_ord := lower(sort_order);
    IF sort_ord NOT IN ('asc', 'desc') THEN
        sort_ord := 'asc';
    END IF;

    -- Determine cursor comparison operator
    IF sort_ord = 'asc' THEN
        cursor_op := '>';
    ELSE
        cursor_op := '<';
    END IF;
    
    sort_col := lower(sort_column);
    -- Validate sort column  
    IF sort_col IN ('updated_at', 'created_at') THEN
        cursor_expr := format(
            '($5 = '''' OR ROW(date_trunc(''milliseconds'', %I), name COLLATE "C") %s ROW(COALESCE(NULLIF($6, '''')::timestamptz, ''epoch''::timestamptz), $5))',
            sort_col, cursor_op
        );
        sort_expr := format(
            'COALESCE(date_trunc(''milliseconds'', %I), ''epoch''::timestamptz) %s, name COLLATE "C" %s',
            sort_col, sort_ord, sort_ord
        );
    ELSE
        cursor_expr := format('($5 = '''' OR name COLLATE "C" %s $5)', cursor_op);
        sort_expr := format('name COLLATE "C" %s', sort_ord);
    END IF;

    RETURN QUERY EXECUTE format(
        $sql$
        SELECT * FROM (
            (
                SELECT
                    split_part(name, '/', $4) AS key,
                    name,
                    NULL::uuid AS id,
                    updated_at,
                    created_at,
                    NULL::timestamptz AS last_accessed_at,
                    NULL::jsonb AS metadata
                FROM storage.prefixes
                WHERE name COLLATE "C" LIKE $1 || '%%'
                    AND bucket_id = $2
                    AND level = $4
                    AND %s
                ORDER BY %s
                LIMIT $3
            )
            UNION ALL
            (
                SELECT
                    split_part(name, '/', $4) AS key,
                    name,
                    id,
                    updated_at,
                    created_at,
                    last_accessed_at,
                    metadata
                FROM storage.objects
                WHERE name COLLATE "C" LIKE $1 || '%%'
                    AND bucket_id = $2
                    AND level = $4
                    AND %s
                ORDER BY %s
                LIMIT $3
            )
        ) obj
        ORDER BY %s
        LIMIT $3
        $sql$,
        cursor_expr,    -- prefixes WHERE
        sort_expr,      -- prefixes ORDER BY
        cursor_expr,    -- objects WHERE
        sort_expr,      -- objects ORDER BY
        sort_expr       -- final ORDER BY
    )
    USING prefix, bucket_name, limits, levels, start_after, sort_column_after;
END;
$_$;


ALTER FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer, levels integer, start_after text, sort_order text, sort_column text, sort_column_after text) OWNER TO supabase_storage_admin;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

--
-- Name: http_request(); Type: FUNCTION; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE FUNCTION supabase_functions.http_request() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'supabase_functions'
    AS $$
  DECLARE
    request_id bigint;
    payload jsonb;
    url text := TG_ARGV[0]::text;
    method text := TG_ARGV[1]::text;
    headers jsonb DEFAULT '{}'::jsonb;
    params jsonb DEFAULT '{}'::jsonb;
    timeout_ms integer DEFAULT 1000;
  BEGIN
    IF url IS NULL OR url = 'null' THEN
      RAISE EXCEPTION 'url argument is missing';
    END IF;

    IF method IS NULL OR method = 'null' THEN
      RAISE EXCEPTION 'method argument is missing';
    END IF;

    IF TG_ARGV[2] IS NULL OR TG_ARGV[2] = 'null' THEN
      headers = '{"Content-Type": "application/json"}'::jsonb;
    ELSE
      headers = TG_ARGV[2]::jsonb;
    END IF;

    IF TG_ARGV[3] IS NULL OR TG_ARGV[3] = 'null' THEN
      params = '{}'::jsonb;
    ELSE
      params = TG_ARGV[3]::jsonb;
    END IF;

    IF TG_ARGV[4] IS NULL OR TG_ARGV[4] = 'null' THEN
      timeout_ms = 1000;
    ELSE
      timeout_ms = TG_ARGV[4]::integer;
    END IF;

    CASE
      WHEN method = 'GET' THEN
        SELECT http_get INTO request_id FROM net.http_get(
          url,
          params,
          headers,
          timeout_ms
        );
      WHEN method = 'POST' THEN
        payload = jsonb_build_object(
          'old_record', OLD,
          'record', NEW,
          'type', TG_OP,
          'table', TG_TABLE_NAME,
          'schema', TG_TABLE_SCHEMA
        );

        SELECT http_post INTO request_id FROM net.http_post(
          url,
          payload,
          params,
          headers,
          timeout_ms
        );
      ELSE
        RAISE EXCEPTION 'method argument % is invalid', method;
    END CASE;

    INSERT INTO supabase_functions.hooks
      (hook_table_id, hook_name, request_id)
    VALUES
      (TG_RELID, TG_NAME, request_id);

    RETURN NEW;
  END
$$;


ALTER FUNCTION supabase_functions.http_request() OWNER TO supabase_functions_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: extensions; Type: TABLE; Schema: _realtime; Owner: supabase_admin
--

CREATE TABLE _realtime.extensions (
    id uuid NOT NULL,
    type text,
    settings jsonb,
    tenant_external_id text,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


ALTER TABLE _realtime.extensions OWNER TO supabase_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: _realtime; Owner: supabase_admin
--

CREATE TABLE _realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE _realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: tenants; Type: TABLE; Schema: _realtime; Owner: supabase_admin
--

CREATE TABLE _realtime.tenants (
    id uuid NOT NULL,
    name text,
    external_id text,
    jwt_secret text,
    max_concurrent_users integer DEFAULT 200 NOT NULL,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    max_events_per_second integer DEFAULT 100 NOT NULL,
    postgres_cdc_default text DEFAULT 'postgres_cdc_rls'::text,
    max_bytes_per_second integer DEFAULT 100000 NOT NULL,
    max_channels_per_client integer DEFAULT 100 NOT NULL,
    max_joins_per_second integer DEFAULT 500 NOT NULL,
    suspend boolean DEFAULT false,
    jwt_jwks jsonb,
    notify_private_alpha boolean DEFAULT false,
    private_only boolean DEFAULT false NOT NULL,
    migrations_ran integer DEFAULT 0,
    broadcast_adapter character varying(255) DEFAULT 'gen_rpc'::character varying,
    max_presence_events_per_second integer DEFAULT 1000,
    max_payload_size_in_kb integer DEFAULT 3000
);


ALTER TABLE _realtime.tenants OWNER TO supabase_admin;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text NOT NULL,
    code_challenge_method auth.code_challenge_method NOT NULL,
    code_challenge text NOT NULL,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'stores metadata for pkce logins';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid,
    last_webauthn_challenge_data jsonb
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: COLUMN mfa_factors.last_webauthn_challenge_data; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.mfa_factors.last_webauthn_challenge_data IS 'Stores the latest WebAuthn challenge data including attestation/assertion for customer verification';


--
-- Name: oauth_authorizations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_authorizations (
    id uuid NOT NULL,
    authorization_id text NOT NULL,
    client_id uuid NOT NULL,
    user_id uuid,
    redirect_uri text NOT NULL,
    scope text NOT NULL,
    state text,
    resource text,
    code_challenge text,
    code_challenge_method auth.code_challenge_method,
    response_type auth.oauth_response_type DEFAULT 'code'::auth.oauth_response_type NOT NULL,
    status auth.oauth_authorization_status DEFAULT 'pending'::auth.oauth_authorization_status NOT NULL,
    authorization_code text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone DEFAULT (now() + '00:03:00'::interval) NOT NULL,
    approved_at timestamp with time zone,
    CONSTRAINT oauth_authorizations_authorization_code_length CHECK ((char_length(authorization_code) <= 255)),
    CONSTRAINT oauth_authorizations_code_challenge_length CHECK ((char_length(code_challenge) <= 128)),
    CONSTRAINT oauth_authorizations_expires_at_future CHECK ((expires_at > created_at)),
    CONSTRAINT oauth_authorizations_redirect_uri_length CHECK ((char_length(redirect_uri) <= 2048)),
    CONSTRAINT oauth_authorizations_resource_length CHECK ((char_length(resource) <= 2048)),
    CONSTRAINT oauth_authorizations_scope_length CHECK ((char_length(scope) <= 4096)),
    CONSTRAINT oauth_authorizations_state_length CHECK ((char_length(state) <= 4096))
);


ALTER TABLE auth.oauth_authorizations OWNER TO supabase_auth_admin;

--
-- Name: oauth_clients; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_clients (
    id uuid NOT NULL,
    client_secret_hash text,
    registration_type auth.oauth_registration_type NOT NULL,
    redirect_uris text NOT NULL,
    grant_types text NOT NULL,
    client_name text,
    client_uri text,
    logo_uri text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    client_type auth.oauth_client_type DEFAULT 'confidential'::auth.oauth_client_type NOT NULL,
    CONSTRAINT oauth_clients_client_name_length CHECK ((char_length(client_name) <= 1024)),
    CONSTRAINT oauth_clients_client_uri_length CHECK ((char_length(client_uri) <= 2048)),
    CONSTRAINT oauth_clients_logo_uri_length CHECK ((char_length(logo_uri) <= 2048))
);


ALTER TABLE auth.oauth_clients OWNER TO supabase_auth_admin;

--
-- Name: oauth_consents; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_consents (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    client_id uuid NOT NULL,
    scopes text NOT NULL,
    granted_at timestamp with time zone DEFAULT now() NOT NULL,
    revoked_at timestamp with time zone,
    CONSTRAINT oauth_consents_revoked_after_granted CHECK (((revoked_at IS NULL) OR (revoked_at >= granted_at))),
    CONSTRAINT oauth_consents_scopes_length CHECK ((char_length(scopes) <= 2048)),
    CONSTRAINT oauth_consents_scopes_not_empty CHECK ((char_length(TRIM(BOTH FROM scopes)) > 0))
);


ALTER TABLE auth.oauth_consents OWNER TO supabase_auth_admin;

--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text,
    oauth_client_id uuid,
    refresh_token_hmac_key text,
    refresh_token_counter bigint
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: COLUMN sessions.refresh_token_hmac_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.refresh_token_hmac_key IS 'Holds a HMAC-SHA256 key used to sign refresh tokens for this session.';


--
-- Name: COLUMN sessions.refresh_token_counter; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.refresh_token_counter IS 'Holds the ID (counter) of the last issued refresh token.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    disabled boolean,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    education_level public.education_level NOT NULL,
    icon text,
    color text DEFAULT '#4F46E5'::text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    email text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    education_level public.education_level NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- Name: routes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.routes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    course_id uuid NOT NULL,
    name text NOT NULL,
    description text,
    level_order integer NOT NULL,
    game_type text NOT NULL,
    game_config jsonb,
    video_url text,
    model_3d_url text,
    is_certification_level boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.routes OWNER TO postgres;

--
-- Name: student_progress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student_progress (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid NOT NULL,
    route_id uuid NOT NULL,
    completed boolean DEFAULT false,
    score integer DEFAULT 0,
    avg_response_time numeric(10,2) DEFAULT 0,
    completion_status text DEFAULT 'not_started'::text,
    best_accuracy_percentage integer DEFAULT 0,
    last_accuracy_percentage integer DEFAULT 0,
    current_level_number integer DEFAULT 1,
    attempts integer DEFAULT 0,
    last_attempt_date timestamp with time zone,
    completion_date timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.student_progress OWNER TO postgres;

--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    user_id uuid NOT NULL,
    user_role public.app_role
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- Name: messages_2025_11_07; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_11_07 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_11_07 OWNER TO supabase_admin;

--
-- Name: messages_2025_11_08; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_11_08 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_11_08 OWNER TO supabase_admin;

--
-- Name: messages_2025_11_09; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_11_09 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_11_09 OWNER TO supabase_admin;

--
-- Name: messages_2025_11_10; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_11_10 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_11_10 OWNER TO supabase_admin;

--
-- Name: messages_2025_11_11; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_11_11 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_11_11 OWNER TO supabase_admin;

--
-- Name: messages_2025_11_12; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_11_12 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_11_12 OWNER TO supabase_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text,
    type storage.buckettype DEFAULT 'STANDARD'::storage.buckettype NOT NULL
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: buckets_analytics; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets_analytics (
    id text NOT NULL,
    type storage.buckettype DEFAULT 'ANALYTICS'::storage.buckettype NOT NULL,
    format text DEFAULT 'ICEBERG'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.buckets_analytics OWNER TO supabase_storage_admin;

--
-- Name: iceberg_namespaces; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.iceberg_namespaces (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text NOT NULL,
    name text NOT NULL COLLATE pg_catalog."C",
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.iceberg_namespaces OWNER TO supabase_storage_admin;

--
-- Name: iceberg_tables; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.iceberg_tables (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    namespace_id uuid NOT NULL,
    bucket_id text NOT NULL,
    name text NOT NULL COLLATE pg_catalog."C",
    location text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.iceberg_tables OWNER TO supabase_storage_admin;

--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb,
    level integer
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: prefixes; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.prefixes (
    bucket_id text NOT NULL,
    name text NOT NULL COLLATE pg_catalog."C",
    level integer GENERATED ALWAYS AS (storage.get_level(name)) STORED NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE storage.prefixes OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- Name: hooks; Type: TABLE; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE TABLE supabase_functions.hooks (
    id bigint NOT NULL,
    hook_table_id integer NOT NULL,
    hook_name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    request_id bigint
);


ALTER TABLE supabase_functions.hooks OWNER TO supabase_functions_admin;

--
-- Name: TABLE hooks; Type: COMMENT; Schema: supabase_functions; Owner: supabase_functions_admin
--

COMMENT ON TABLE supabase_functions.hooks IS 'Supabase Functions Hooks: Audit trail for triggered hooks.';


--
-- Name: hooks_id_seq; Type: SEQUENCE; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE SEQUENCE supabase_functions.hooks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE supabase_functions.hooks_id_seq OWNER TO supabase_functions_admin;

--
-- Name: hooks_id_seq; Type: SEQUENCE OWNED BY; Schema: supabase_functions; Owner: supabase_functions_admin
--

ALTER SEQUENCE supabase_functions.hooks_id_seq OWNED BY supabase_functions.hooks.id;


--
-- Name: migrations; Type: TABLE; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE TABLE supabase_functions.migrations (
    version text NOT NULL,
    inserted_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE supabase_functions.migrations OWNER TO supabase_functions_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: supabase_migrations; Owner: postgres
--

CREATE TABLE supabase_migrations.schema_migrations (
    version text NOT NULL,
    statements text[],
    name text
);


ALTER TABLE supabase_migrations.schema_migrations OWNER TO postgres;

--
-- Name: seed_files; Type: TABLE; Schema: supabase_migrations; Owner: postgres
--

CREATE TABLE supabase_migrations.seed_files (
    path text NOT NULL,
    hash text NOT NULL
);


ALTER TABLE supabase_migrations.seed_files OWNER TO postgres;

--
-- Name: messages_2025_11_07; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_11_07 FOR VALUES FROM ('2025-11-07 00:00:00') TO ('2025-11-08 00:00:00');


--
-- Name: messages_2025_11_08; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_11_08 FOR VALUES FROM ('2025-11-08 00:00:00') TO ('2025-11-09 00:00:00');


--
-- Name: messages_2025_11_09; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_11_09 FOR VALUES FROM ('2025-11-09 00:00:00') TO ('2025-11-10 00:00:00');


--
-- Name: messages_2025_11_10; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_11_10 FOR VALUES FROM ('2025-11-10 00:00:00') TO ('2025-11-11 00:00:00');


--
-- Name: messages_2025_11_11; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_11_11 FOR VALUES FROM ('2025-11-11 00:00:00') TO ('2025-11-12 00:00:00');


--
-- Name: messages_2025_11_12; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_11_12 FOR VALUES FROM ('2025-11-12 00:00:00') TO ('2025-11-13 00:00:00');


--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Name: hooks id; Type: DEFAULT; Schema: supabase_functions; Owner: supabase_functions_admin
--

ALTER TABLE ONLY supabase_functions.hooks ALTER COLUMN id SET DEFAULT nextval('supabase_functions.hooks_id_seq'::regclass);


--
-- Data for Name: extensions; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

COPY _realtime.extensions (id, type, settings, tenant_external_id, inserted_at, updated_at) FROM stdin;
d7d0d600-a0da-47ae-9936-3efd23d21828	postgres_cdc_rls	{"region": "us-east-1", "db_host": "uW9060EEytWIcr+2CCqOKOnTrSlkmSMDAk8VnEF8+vlPNrrhma6I8nd28t/mto4/", "db_name": "sWBpZNdjggEPTQVlI52Zfw==", "db_port": "+enMDFi1J/3IrrquHHwUmA==", "db_user": "uxbEq/zz8DXVD53TOI1zmw==", "slot_name": "supabase_realtime_replication_slot", "db_password": "sWBpZNdjggEPTQVlI52Zfw==", "publication": "supabase_realtime", "ssl_enforced": false, "poll_interval_ms": 100, "poll_max_changes": 100, "poll_max_record_bytes": 1048576}	realtime-dev	2025-11-09 23:04:16	2025-11-09 23:04:16
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

COPY _realtime.schema_migrations (version, inserted_at) FROM stdin;
20210706140551	2025-11-08 22:03:55
20220329161857	2025-11-08 22:03:55
20220410212326	2025-11-08 22:03:55
20220506102948	2025-11-08 22:03:55
20220527210857	2025-11-08 22:03:55
20220815211129	2025-11-08 22:03:55
20220815215024	2025-11-08 22:03:55
20220818141501	2025-11-08 22:03:55
20221018173709	2025-11-08 22:03:55
20221102172703	2025-11-08 22:03:55
20221223010058	2025-11-08 22:03:55
20230110180046	2025-11-08 22:03:55
20230810220907	2025-11-08 22:03:55
20230810220924	2025-11-08 22:03:55
20231024094642	2025-11-08 22:03:55
20240306114423	2025-11-08 22:03:55
20240418082835	2025-11-08 22:03:55
20240625211759	2025-11-08 22:03:55
20240704172020	2025-11-08 22:03:55
20240902173232	2025-11-08 22:03:55
20241106103258	2025-11-08 22:03:55
20250424203323	2025-11-08 22:03:55
20250613072131	2025-11-08 22:03:55
20250711044927	2025-11-08 22:03:55
20250811121559	2025-11-08 22:03:55
20250926223044	2025-11-08 22:03:55
\.


--
-- Data for Name: tenants; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

COPY _realtime.tenants (id, name, external_id, jwt_secret, max_concurrent_users, inserted_at, updated_at, max_events_per_second, postgres_cdc_default, max_bytes_per_second, max_channels_per_client, max_joins_per_second, suspend, jwt_jwks, notify_private_alpha, private_only, migrations_ran, broadcast_adapter, max_presence_events_per_second, max_payload_size_in_kb) FROM stdin;
44921223-8d3f-464c-815f-67b5f3504666	realtime-dev	realtime-dev	iNjicxc4+llvc9wovDvqymwfnj9teWMlyOIbJ8Fh6j2WNU8CIJ2ZgjR6MUIKqSmeDmvpsKLsZ9jgXJmQPpwL8w==	200	2025-11-09 23:04:16	2025-11-09 23:04:16	100	postgres_cdc_rls	100000	100	100	f	{"keys": [{"k": "c3VwZXItc2VjcmV0LWp3dC10b2tlbi13aXRoLWF0LWxlYXN0LTMyLWNoYXJhY3RlcnMtbG9uZw", "kty": "oct"}]}	f	f	64	gen_rpc	1000	3000
\.


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
00000000-0000-0000-0000-000000000000	44ffbb1c-1b79-4c8b-a40f-1149fdd9795a	{"action":"user_signedup","actor_id":"8b7e41fe-5f6e-4dd8-88e9-f013773b11c3","actor_username":"preescolar@test.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 22:06:38.357278+00	
00000000-0000-0000-0000-000000000000	f32902ae-7b09-4ac2-a11c-819f4379fbce	{"action":"login","actor_id":"8b7e41fe-5f6e-4dd8-88e9-f013773b11c3","actor_username":"preescolar@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 22:06:38.374873+00	
00000000-0000-0000-0000-000000000000	631f828a-b0aa-47f9-9949-988c14e583c5	{"action":"user_repeated_signup","actor_id":"8b7e41fe-5f6e-4dd8-88e9-f013773b11c3","actor_username":"preescolar@test.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-08 22:07:30.714717+00	
00000000-0000-0000-0000-000000000000	efe53e73-1602-4ad2-91d7-a322c169d623	{"action":"user_repeated_signup","actor_id":"8b7e41fe-5f6e-4dd8-88e9-f013773b11c3","actor_username":"preescolar@test.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-08 22:11:25.847619+00	
00000000-0000-0000-0000-000000000000	cefcecc9-2f6d-4db8-8c10-b8b9897de854	{"action":"user_repeated_signup","actor_id":"8b7e41fe-5f6e-4dd8-88e9-f013773b11c3","actor_username":"preescolar@test.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-08 22:11:38.838167+00	
00000000-0000-0000-0000-000000000000	9e45ab4d-997f-40e4-9e52-756b9bf1dcad	{"action":"login","actor_id":"8b7e41fe-5f6e-4dd8-88e9-f013773b11c3","actor_username":"preescolar@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 22:11:46.712934+00	
00000000-0000-0000-0000-000000000000	4f0a2fee-1201-424a-a6c6-3c46ef55bc91	{"action":"user_signedup","actor_id":"80e35b78-522e-452d-b948-5d460573a7e9","actor_username":"123@123.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 22:13:07.846675+00	
00000000-0000-0000-0000-000000000000	dc010d8b-34cb-432a-90e5-5afdc64df62b	{"action":"login","actor_id":"80e35b78-522e-452d-b948-5d460573a7e9","actor_username":"123@123.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 22:13:07.86249+00	
00000000-0000-0000-0000-000000000000	1d15c7a5-02ac-41c1-84a0-2ed217f2b7cc	{"action":"user_repeated_signup","actor_id":"80e35b78-522e-452d-b948-5d460573a7e9","actor_username":"123@123.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-08 22:13:33.663867+00	
00000000-0000-0000-0000-000000000000	e18cb306-ee10-4829-9aa7-fe5e4e43a536	{"action":"user_signedup","actor_id":"0611cf04-7de4-414d-b8a8-b2637b316fab","actor_username":"123123@123123.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 22:13:53.005879+00	
00000000-0000-0000-0000-000000000000	42ed8533-a797-403f-8491-7e181470c1c1	{"action":"login","actor_id":"0611cf04-7de4-414d-b8a8-b2637b316fab","actor_username":"123123@123123.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 22:13:53.02333+00	
00000000-0000-0000-0000-000000000000	ff248c9c-e8e2-4733-9c0f-de8bbbefbddc	{"action":"logout","actor_id":"0611cf04-7de4-414d-b8a8-b2637b316fab","actor_username":"123123@123123.com","actor_via_sso":false,"log_type":"account"}	2025-11-08 22:14:55.525915+00	
00000000-0000-0000-0000-000000000000	3ddc1ace-e339-4bcc-a194-26d861c3876d	{"action":"user_signedup","actor_id":"1b8503b9-7a82-43dd-82b3-3e8e972a34ed","actor_username":"hola@hola.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 22:15:08.290182+00	
00000000-0000-0000-0000-000000000000	ce445537-779a-4efc-86bb-1b107f880b55	{"action":"login","actor_id":"1b8503b9-7a82-43dd-82b3-3e8e972a34ed","actor_username":"hola@hola.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 22:15:08.306223+00	
00000000-0000-0000-0000-000000000000	31cbd9ec-a093-4b40-9436-2c230938d5d1	{"action":"user_signedup","actor_id":"342b5381-0738-4666-9f2f-c7061f809e81","actor_username":"hola@holae.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 22:17:13.043215+00	
00000000-0000-0000-0000-000000000000	62f8bef5-f3ef-4cfb-abd4-2c149bb50db1	{"action":"login","actor_id":"342b5381-0738-4666-9f2f-c7061f809e81","actor_username":"hola@holae.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 22:17:13.058996+00	
00000000-0000-0000-0000-000000000000	73c58f08-109a-47e8-94f0-57f0c5ca2ca2	{"action":"user_repeated_signup","actor_id":"8b7e41fe-5f6e-4dd8-88e9-f013773b11c3","actor_username":"preescolar@test.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-08 22:18:05.355413+00	
00000000-0000-0000-0000-000000000000	f49a8a3f-9503-4687-8b6d-66d5e447f24a	{"action":"user_repeated_signup","actor_id":"8b7e41fe-5f6e-4dd8-88e9-f013773b11c3","actor_username":"preescolar@test.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-08 22:18:12.069486+00	
00000000-0000-0000-0000-000000000000	781ae463-30a4-4cf9-82b9-4b6bed50ba92	{"action":"user_signedup","actor_id":"74af9aa5-d723-41c7-b25a-5c75d0e9577c","actor_username":"preescolar@preescolar.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 22:18:32.932092+00	
00000000-0000-0000-0000-000000000000	36f429d9-0067-43c2-aca4-69670d418042	{"action":"login","actor_id":"74af9aa5-d723-41c7-b25a-5c75d0e9577c","actor_username":"preescolar@preescolar.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 22:18:32.948346+00	
00000000-0000-0000-0000-000000000000	9825c4a1-2901-4921-b2d1-859302ee1a21	{"action":"user_signedup","actor_id":"f6405ffd-769a-4d2d-93eb-17db1c567e92","actor_username":"primaria@test.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 22:21:18.638892+00	
00000000-0000-0000-0000-000000000000	37f7866e-8c1b-460f-a82e-30fa59181d93	{"action":"login","actor_id":"f6405ffd-769a-4d2d-93eb-17db1c567e92","actor_username":"primaria@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 22:21:18.659802+00	
00000000-0000-0000-0000-000000000000	4843e864-8ac4-448e-bf43-11aebe284361	{"action":"user_repeated_signup","actor_id":"f6405ffd-769a-4d2d-93eb-17db1c567e92","actor_username":"primaria@test.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-08 22:21:30.523298+00	
00000000-0000-0000-0000-000000000000	e3b022d8-f0d3-4123-aac1-fee273472644	{"action":"user_repeated_signup","actor_id":"f6405ffd-769a-4d2d-93eb-17db1c567e92","actor_username":"primaria@test.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-08 22:21:36.513563+00	
00000000-0000-0000-0000-000000000000	79f37a76-5ea5-4d13-8d4f-f916dc504889	{"action":"user_signedup","actor_id":"371df898-0442-4ed0-9f86-e1b21c0d1b12","actor_username":"primaria@teste.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 22:21:41.473594+00	
00000000-0000-0000-0000-000000000000	fe8b18e7-5728-402d-a383-a22a069f7333	{"action":"login","actor_id":"371df898-0442-4ed0-9f86-e1b21c0d1b12","actor_username":"primaria@teste.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 22:21:41.487283+00	
00000000-0000-0000-0000-000000000000	ad9660d6-536f-4db0-865c-a1daa0d1e871	{"action":"user_signedup","actor_id":"2d5642ad-5e4c-46b9-acd7-4bab3293ebe8","actor_username":"test@preescolar.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 22:26:42.960338+00	
00000000-0000-0000-0000-000000000000	cc9bc8fd-6b73-435d-808d-0c1305982daf	{"action":"login","actor_id":"2d5642ad-5e4c-46b9-acd7-4bab3293ebe8","actor_username":"test@preescolar.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 22:26:42.977596+00	
00000000-0000-0000-0000-000000000000	6355f8e0-718e-47f2-a458-69a1c9da11f1	{"action":"user_signedup","actor_id":"74c8b393-6be2-44d2-8231-ba8f21efd873","actor_username":"vega@jaime.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 22:28:16.938655+00	
00000000-0000-0000-0000-000000000000	c2812489-ef7d-47d6-bb9f-61a23256533a	{"action":"login","actor_id":"74c8b393-6be2-44d2-8231-ba8f21efd873","actor_username":"vega@jaime.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 22:28:16.983159+00	
00000000-0000-0000-0000-000000000000	cde8bfd5-bc1c-4e60-8d11-d964afe2265e	{"action":"user_signedup","actor_id":"85d8c4e4-0342-468e-b1d9-cbdc9e6f8442","actor_username":"vega@jaimee.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 22:29:54.787301+00	
00000000-0000-0000-0000-000000000000	6f16b23a-9f37-46c1-b6a2-7869dc09df8e	{"action":"login","actor_id":"85d8c4e4-0342-468e-b1d9-cbdc9e6f8442","actor_username":"vega@jaimee.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 22:29:54.803235+00	
00000000-0000-0000-0000-000000000000	10e2a74f-1791-4c5e-9f04-69a53106524a	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"hola@hola.com","user_id":"1b8503b9-7a82-43dd-82b3-3e8e972a34ed","user_phone":""}}	2025-11-08 22:30:38.385162+00	
00000000-0000-0000-0000-000000000000	711ec5d8-d997-4182-9398-f4722439a4b1	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"123123@123123.com","user_id":"0611cf04-7de4-414d-b8a8-b2637b316fab","user_phone":""}}	2025-11-08 22:30:38.389616+00	
00000000-0000-0000-0000-000000000000	b2ca5fc9-0076-411f-a4cd-2c8e07d9305d	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"test@preescolar.com","user_id":"2d5642ad-5e4c-46b9-acd7-4bab3293ebe8","user_phone":""}}	2025-11-08 22:30:38.401641+00	
00000000-0000-0000-0000-000000000000	ef7bd306-bb6c-4025-949c-30b50ddbd724	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"hola@holae.com","user_id":"342b5381-0738-4666-9f2f-c7061f809e81","user_phone":""}}	2025-11-08 22:30:38.435414+00	
00000000-0000-0000-0000-000000000000	6713577a-bfe1-42f6-a33c-372490ff787f	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"preescolar@preescolar.com","user_id":"74af9aa5-d723-41c7-b25a-5c75d0e9577c","user_phone":""}}	2025-11-08 22:30:38.441202+00	
00000000-0000-0000-0000-000000000000	90a8df68-e08d-40e6-8ab2-f742ab019d50	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"primaria@teste.com","user_id":"371df898-0442-4ed0-9f86-e1b21c0d1b12","user_phone":""}}	2025-11-08 22:30:38.444553+00	
00000000-0000-0000-0000-000000000000	443e6ede-5b28-44bb-bf43-47f1144ab676	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"123@123.com","user_id":"80e35b78-522e-452d-b948-5d460573a7e9","user_phone":""}}	2025-11-08 22:30:38.495668+00	
00000000-0000-0000-0000-000000000000	b78f2f5d-623f-477f-adf2-cc8bdb22d18e	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"vega@jaime.com","user_id":"74c8b393-6be2-44d2-8231-ba8f21efd873","user_phone":""}}	2025-11-08 22:30:38.496978+00	
00000000-0000-0000-0000-000000000000	347273c8-cbb0-4693-bd1c-de11623ef249	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"preescolar@test.com","user_id":"8b7e41fe-5f6e-4dd8-88e9-f013773b11c3","user_phone":""}}	2025-11-08 22:30:38.506898+00	
00000000-0000-0000-0000-000000000000	60bd9be5-7ed2-4258-89d5-3a355e7354f7	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"primaria@test.com","user_id":"f6405ffd-769a-4d2d-93eb-17db1c567e92","user_phone":""}}	2025-11-08 22:30:38.538654+00	
00000000-0000-0000-0000-000000000000	e7b4ebde-2bf7-41ef-a25b-fa9ae2a18c16	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"vega@jaimee.com","user_id":"85d8c4e4-0342-468e-b1d9-cbdc9e6f8442","user_phone":""}}	2025-11-08 22:30:38.539632+00	
00000000-0000-0000-0000-000000000000	24f20624-999b-4555-bd70-9729ad054354	{"action":"user_signedup","actor_id":"260008e5-d5ce-4ebd-bfd5-5a0885c0a944","actor_username":"123123123123@123.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 22:33:29.444142+00	
00000000-0000-0000-0000-000000000000	80221e93-b8d0-4c60-98c9-fb0d85f66399	{"action":"login","actor_id":"260008e5-d5ce-4ebd-bfd5-5a0885c0a944","actor_username":"123123123123@123.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 22:33:29.460127+00	
00000000-0000-0000-0000-000000000000	9bd01693-d5fa-41d7-bf83-12130ee07a1d	{"action":"user_signedup","actor_id":"c09206db-047a-4ee7-9029-03ea10e4f2a9","actor_username":"123123123123@1233.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 22:34:38.035923+00	
00000000-0000-0000-0000-000000000000	5591c555-4c39-4912-bbf0-983f51db5a16	{"action":"login","actor_id":"c09206db-047a-4ee7-9029-03ea10e4f2a9","actor_username":"123123123123@1233.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 22:34:38.053397+00	
00000000-0000-0000-0000-000000000000	015a7037-3691-4ec2-8d98-337947dbc26a	{"action":"user_signedup","actor_id":"7c9da78d-8a33-4189-aed3-4335e4ccb381","actor_username":"123123121233123@1233123.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 22:35:35.494948+00	
00000000-0000-0000-0000-000000000000	d0d1f49e-94b9-4f5b-96c8-0c665082a39c	{"action":"login","actor_id":"7c9da78d-8a33-4189-aed3-4335e4ccb381","actor_username":"123123121233123@1233123.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 22:35:35.511698+00	
00000000-0000-0000-0000-000000000000	f99bb6b1-51ba-4cf9-b628-384a154127c8	{"action":"user_signedup","actor_id":"42b321bf-086a-4794-ac3c-270f88b06452","actor_username":"xd@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 23:07:56.958077+00	
00000000-0000-0000-0000-000000000000	1042925a-636d-4b3a-957b-18df32f6b4b4	{"action":"login","actor_id":"42b321bf-086a-4794-ac3c-270f88b06452","actor_username":"xd@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 23:07:56.974137+00	
00000000-0000-0000-0000-000000000000	bb52efe4-3ac0-4a5f-803b-023100307013	{"action":"user_signedup","actor_id":"5f270ece-a534-494c-9ff9-c5c4ddd39a1c","actor_username":"123123@p.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 23:10:58.88082+00	
00000000-0000-0000-0000-000000000000	271c8350-1f0f-4797-a24a-aca50746ca9a	{"action":"login","actor_id":"5f270ece-a534-494c-9ff9-c5c4ddd39a1c","actor_username":"123123@p.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 23:10:58.897574+00	
00000000-0000-0000-0000-000000000000	60b3d4f2-56db-4c91-9e41-6949d31c5765	{"action":"user_signedup","actor_id":"daa0938b-9089-40cf-9fee-72d6a71428d1","actor_username":"123333@33.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 23:20:33.227483+00	
00000000-0000-0000-0000-000000000000	e2770f31-7a16-4439-ac0d-e12df9d5f6ad	{"action":"login","actor_id":"daa0938b-9089-40cf-9fee-72d6a71428d1","actor_username":"123333@33.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 23:20:33.244056+00	
00000000-0000-0000-0000-000000000000	837f45e9-4a98-4255-a110-566df2eb9ef5	{"action":"user_signedup","actor_id":"64daea70-5695-4a52-bd11-018dfe062416","actor_username":"1@1.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 23:21:25.911389+00	
00000000-0000-0000-0000-000000000000	2e584e2e-2c19-466b-9fc0-7a05019d478f	{"action":"login","actor_id":"64daea70-5695-4a52-bd11-018dfe062416","actor_username":"1@1.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 23:21:25.927222+00	
00000000-0000-0000-0000-000000000000	661fb5bc-f8dc-4e34-a861-10a14ab454e5	{"action":"user_signedup","actor_id":"3792262f-7ece-4471-a1f1-386e3212f3f9","actor_username":"1@2.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 23:21:57.341903+00	
00000000-0000-0000-0000-000000000000	2974016d-ddf4-430e-963b-f42ff5d70556	{"action":"login","actor_id":"3792262f-7ece-4471-a1f1-386e3212f3f9","actor_username":"1@2.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 23:21:57.358618+00	
00000000-0000-0000-0000-000000000000	1d060243-33f3-4d74-a704-0c4d022678b0	{"action":"user_signedup","actor_id":"08960912-ad37-41a6-a656-3f8a6e6dc3c3","actor_username":"3@4.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 23:23:51.768841+00	
00000000-0000-0000-0000-000000000000	6f4f1b88-b4da-4943-b006-fb1c62c2fbea	{"action":"login","actor_id":"08960912-ad37-41a6-a656-3f8a6e6dc3c3","actor_username":"3@4.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 23:23:51.786093+00	
00000000-0000-0000-0000-000000000000	f85286a9-fa40-4b8b-8602-396643069b35	{"action":"user_signedup","actor_id":"a1baa378-ad37-494b-9025-bfdf19854e01","actor_username":"13@1.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 23:24:28.812735+00	
00000000-0000-0000-0000-000000000000	98c8cdb0-b883-4cd2-87af-02004874d507	{"action":"login","actor_id":"a1baa378-ad37-494b-9025-bfdf19854e01","actor_username":"13@1.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 23:24:28.836877+00	
00000000-0000-0000-0000-000000000000	529a76c3-c800-489f-b337-9d815421c549	{"action":"user_signedup","actor_id":"2ea699c4-a13a-4fc5-9311-2ea5fb7132fd","actor_username":"3@2.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 23:25:49.541203+00	
00000000-0000-0000-0000-000000000000	7c9e16fe-fec0-4a63-8187-1f5e58a0a2e1	{"action":"login","actor_id":"2ea699c4-a13a-4fc5-9311-2ea5fb7132fd","actor_username":"3@2.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 23:25:49.556814+00	
00000000-0000-0000-0000-000000000000	1f37b47c-ef8a-48c3-97cf-1f060a8bac10	{"action":"user_signedup","actor_id":"4a0103e6-deb1-4acb-baca-b73740fa6e16","actor_username":"11@1.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 23:26:48.670074+00	
00000000-0000-0000-0000-000000000000	5b33eff1-9402-4072-8f38-32cf756bca4a	{"action":"login","actor_id":"4a0103e6-deb1-4acb-baca-b73740fa6e16","actor_username":"11@1.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 23:26:48.686704+00	
00000000-0000-0000-0000-000000000000	0db05085-a533-42be-bcf0-63f35ca3f126	{"action":"user_signedup","actor_id":"4631168f-980a-4415-8377-b4cad2228672","actor_username":"123@l.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 23:27:35.381539+00	
00000000-0000-0000-0000-000000000000	f338b6c8-b04d-4a7d-913d-292ce9e0a473	{"action":"login","actor_id":"4631168f-980a-4415-8377-b4cad2228672","actor_username":"123@l.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 23:27:35.397734+00	
00000000-0000-0000-0000-000000000000	f50bdc34-62e7-41a9-9e1c-ab416fc6d347	{"action":"user_signedup","actor_id":"80be71f8-5be6-4399-91f9-05c2f704d58a","actor_username":"123@w.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 23:33:43.599317+00	
00000000-0000-0000-0000-000000000000	bd3c435e-7025-404d-b523-a8f697b2e1ad	{"action":"login","actor_id":"80be71f8-5be6-4399-91f9-05c2f704d58a","actor_username":"123@w.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 23:33:43.616359+00	
00000000-0000-0000-0000-000000000000	4348d401-95d2-485f-8221-fad79d0822a7	{"action":"user_signedup","actor_id":"bdb3801f-7a27-4096-806f-d20f595ea800","actor_username":"123@k.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 23:35:31.355866+00	
00000000-0000-0000-0000-000000000000	f555a751-532d-4aee-b4cf-b190a77fb371	{"action":"login","actor_id":"bdb3801f-7a27-4096-806f-d20f595ea800","actor_username":"123@k.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 23:35:31.375294+00	
00000000-0000-0000-0000-000000000000	c0d4d62c-525f-418e-9431-da4474468787	{"action":"user_signedup","actor_id":"fc8c9557-d9c7-4e50-80ae-1b2656e90072","actor_username":"123@k3.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 23:36:42.893398+00	
00000000-0000-0000-0000-000000000000	9b410cfa-ccca-4ad1-a37c-50768dc509ea	{"action":"login","actor_id":"fc8c9557-d9c7-4e50-80ae-1b2656e90072","actor_username":"123@k3.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 23:36:42.912033+00	
00000000-0000-0000-0000-000000000000	10968e5c-da1a-412a-b8f8-db2a3b4168ea	{"action":"logout","actor_id":"fc8c9557-d9c7-4e50-80ae-1b2656e90072","actor_username":"123@k3.com","actor_via_sso":false,"log_type":"account"}	2025-11-08 23:38:26.96758+00	
00000000-0000-0000-0000-000000000000	5fc9a1d6-0c98-4380-8b99-e92800961a4e	{"action":"user_signedup","actor_id":"271612a2-3a45-4b89-bb74-c5046017fdfa","actor_username":"3@6.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 23:38:36.699331+00	
00000000-0000-0000-0000-000000000000	1c0f3837-fccd-431d-8bf0-d8adbb559ed8	{"action":"login","actor_id":"271612a2-3a45-4b89-bb74-c5046017fdfa","actor_username":"3@6.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 23:38:36.717763+00	
00000000-0000-0000-0000-000000000000	0b7cca71-6d19-4566-8d18-45e8f0363382	{"action":"logout","actor_id":"271612a2-3a45-4b89-bb74-c5046017fdfa","actor_username":"3@6.com","actor_via_sso":false,"log_type":"account"}	2025-11-08 23:42:52.468836+00	
00000000-0000-0000-0000-000000000000	eb715255-4ed3-4750-8f1d-a3bed3e65af9	{"action":"user_signedup","actor_id":"8e289215-ab39-43c2-ac2b-2037372019d6","actor_username":"primaria@test.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 23:43:05.644844+00	
00000000-0000-0000-0000-000000000000	cc7a9fe0-089b-4c83-af60-27d63615d1ed	{"action":"login","actor_id":"8e289215-ab39-43c2-ac2b-2037372019d6","actor_username":"primaria@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 23:43:05.660693+00	
00000000-0000-0000-0000-000000000000	feba896f-e6b3-4b93-8a11-334d7de80116	{"action":"logout","actor_id":"8e289215-ab39-43c2-ac2b-2037372019d6","actor_username":"primaria@test.com","actor_via_sso":false,"log_type":"account"}	2025-11-08 23:48:49.99383+00	
00000000-0000-0000-0000-000000000000	6bd27d6c-02de-424d-afff-4e30cbb779ec	{"action":"user_signedup","actor_id":"05601181-af76-4acd-bc60-33e43ec5f4b3","actor_username":"alfin@dios.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-08 23:49:09.033347+00	
00000000-0000-0000-0000-000000000000	06cc5c42-54a2-4ece-8a5d-03ce32cb136a	{"action":"login","actor_id":"05601181-af76-4acd-bc60-33e43ec5f4b3","actor_username":"alfin@dios.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-08 23:49:09.051198+00	
00000000-0000-0000-0000-000000000000	ec323770-733d-40c7-9326-f4605b5517d3	{"action":"token_refreshed","actor_id":"05601181-af76-4acd-bc60-33e43ec5f4b3","actor_username":"alfin@dios.com","actor_via_sso":false,"log_type":"token"}	2025-11-09 00:47:19.538869+00	
00000000-0000-0000-0000-000000000000	b4feda9e-48a4-4bfe-9a3e-2b6a18f9b38d	{"action":"token_revoked","actor_id":"05601181-af76-4acd-bc60-33e43ec5f4b3","actor_username":"alfin@dios.com","actor_via_sso":false,"log_type":"token"}	2025-11-09 00:47:19.541591+00	
00000000-0000-0000-0000-000000000000	440e1538-9697-4a39-8ecf-0b8f3930fb68	{"action":"logout","actor_id":"05601181-af76-4acd-bc60-33e43ec5f4b3","actor_username":"alfin@dios.com","actor_via_sso":false,"log_type":"account"}	2025-11-09 00:49:55.04526+00	
00000000-0000-0000-0000-000000000000	7d86594c-98b0-4ab1-b47a-031642fefda5	{"action":"user_signedup","actor_id":"0a48868e-8222-49d7-98ea-67d82af804ba","actor_username":"123@123123123141341232123.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-09 01:00:43.518823+00	
00000000-0000-0000-0000-000000000000	f92e427b-f2a8-48fb-a026-a0a2372a2732	{"action":"login","actor_id":"0a48868e-8222-49d7-98ea-67d82af804ba","actor_username":"123@123123123141341232123.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-09 01:00:43.537393+00	
00000000-0000-0000-0000-000000000000	dfe7175d-e391-47d0-93ba-97caea0311b7	{"action":"logout","actor_id":"0a48868e-8222-49d7-98ea-67d82af804ba","actor_username":"123@123123123141341232123.com","actor_via_sso":false,"log_type":"account"}	2025-11-09 01:03:12.286183+00	
00000000-0000-0000-0000-000000000000	c4a2f777-1d2f-4215-b154-822f69a08ce2	{"action":"user_repeated_signup","actor_id":"8e289215-ab39-43c2-ac2b-2037372019d6","actor_username":"primaria@test.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-09 01:03:27.162005+00	
00000000-0000-0000-0000-000000000000	644a10c5-0536-430b-b39a-77a3b48800aa	{"action":"user_signedup","actor_id":"f00b7c3c-9335-4511-9764-78fec94700d3","actor_username":"primaria@test21.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-09 01:03:30.695618+00	
00000000-0000-0000-0000-000000000000	24d17408-3670-473e-92ce-0a15e77b6d74	{"action":"login","actor_id":"f00b7c3c-9335-4511-9764-78fec94700d3","actor_username":"primaria@test21.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-09 01:03:30.711734+00	
00000000-0000-0000-0000-000000000000	be39da26-a9a6-4bd9-a079-4b2eb8a175b9	{"action":"logout","actor_id":"f00b7c3c-9335-4511-9764-78fec94700d3","actor_username":"primaria@test21.com","actor_via_sso":false,"log_type":"account"}	2025-11-09 01:38:22.054603+00	
00000000-0000-0000-0000-000000000000	047b2b8a-ed8d-4e0a-aa53-8f2d0e169e3f	{"action":"user_signedup","actor_id":"f402990f-13eb-4197-a30d-54eb34d5a3d8","actor_username":"secundaria@test.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-09 01:38:31.444287+00	
00000000-0000-0000-0000-000000000000	c1882e47-4351-4399-b288-adc7bcb32bd5	{"action":"login","actor_id":"f402990f-13eb-4197-a30d-54eb34d5a3d8","actor_username":"secundaria@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-09 01:38:31.463251+00	
00000000-0000-0000-0000-000000000000	7a90ddd5-41c7-48de-bcb3-eff28f3c2f42	{"action":"logout","actor_id":"f402990f-13eb-4197-a30d-54eb34d5a3d8","actor_username":"secundaria@test.com","actor_via_sso":false,"log_type":"account"}	2025-11-09 01:49:02.256539+00	
00000000-0000-0000-0000-000000000000	50c4cbe6-1643-4628-b4a8-8d34701066c6	{"action":"user_signedup","actor_id":"e9b51bb1-0ed5-45d1-b7bb-3566ca21089f","actor_username":"bachillerato@test.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-09 01:49:14.37892+00	
00000000-0000-0000-0000-000000000000	514fab9a-1d0f-4af5-bd4e-60fde83d8fc2	{"action":"login","actor_id":"e9b51bb1-0ed5-45d1-b7bb-3566ca21089f","actor_username":"bachillerato@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-09 01:49:14.393244+00	
00000000-0000-0000-0000-000000000000	598b6a77-2e89-4605-9c7a-185097b4c18c	{"action":"token_refreshed","actor_id":"e9b51bb1-0ed5-45d1-b7bb-3566ca21089f","actor_username":"bachillerato@test.com","actor_via_sso":false,"log_type":"token"}	2025-11-09 03:20:36.478179+00	
00000000-0000-0000-0000-000000000000	125f0c4a-642c-444b-9504-f4d5648c9d62	{"action":"token_revoked","actor_id":"e9b51bb1-0ed5-45d1-b7bb-3566ca21089f","actor_username":"bachillerato@test.com","actor_via_sso":false,"log_type":"token"}	2025-11-09 03:20:36.482568+00	
00000000-0000-0000-0000-000000000000	d1592ea8-b613-4eb6-ad40-b6a81edca907	{"action":"token_refreshed","actor_id":"e9b51bb1-0ed5-45d1-b7bb-3566ca21089f","actor_username":"bachillerato@test.com","actor_via_sso":false,"log_type":"token"}	2025-11-09 22:56:17.050916+00	
00000000-0000-0000-0000-000000000000	233b55c9-e510-4c4d-86b5-ff380e4e8536	{"action":"token_revoked","actor_id":"e9b51bb1-0ed5-45d1-b7bb-3566ca21089f","actor_username":"bachillerato@test.com","actor_via_sso":false,"log_type":"token"}	2025-11-09 22:56:17.055151+00	
00000000-0000-0000-0000-000000000000	1b6e740a-2287-46cc-8d5a-7298e76f60bb	{"action":"logout","actor_id":"e9b51bb1-0ed5-45d1-b7bb-3566ca21089f","actor_username":"bachillerato@test.com","actor_via_sso":false,"log_type":"account"}	2025-11-09 22:57:24.28032+00	
00000000-0000-0000-0000-000000000000	2f484947-6aa5-413c-a997-467dc484bd2b	{"action":"login","actor_id":"8e289215-ab39-43c2-ac2b-2037372019d6","actor_username":"primaria@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-09 22:57:44.91254+00	
00000000-0000-0000-0000-000000000000	8388717c-c243-4626-82ce-80497d72983f	{"action":"logout","actor_id":"8e289215-ab39-43c2-ac2b-2037372019d6","actor_username":"primaria@test.com","actor_via_sso":false,"log_type":"account"}	2025-11-09 23:00:37.883663+00	
00000000-0000-0000-0000-000000000000	0b843730-6e1b-436b-9a71-1879d2cdfe16	{"action":"login","actor_id":"8e289215-ab39-43c2-ac2b-2037372019d6","actor_username":"primaria@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-09 23:00:58.953696+00	
00000000-0000-0000-0000-000000000000	058b9af1-e196-487f-addf-8611d5656485	{"action":"logout","actor_id":"8e289215-ab39-43c2-ac2b-2037372019d6","actor_username":"primaria@test.com","actor_via_sso":false,"log_type":"account"}	2025-11-09 23:08:51.613448+00	
00000000-0000-0000-0000-000000000000	1e788f00-ed69-43e5-a898-1b7a3bcf2750	{"action":"login","actor_id":"8e289215-ab39-43c2-ac2b-2037372019d6","actor_username":"primaria@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-09 23:08:58.737448+00	
00000000-0000-0000-0000-000000000000	9b16e016-caf3-414e-8875-dadd94e2b8c2	{"action":"logout","actor_id":"8e289215-ab39-43c2-ac2b-2037372019d6","actor_username":"primaria@test.com","actor_via_sso":false,"log_type":"account"}	2025-11-09 23:09:15.167856+00	
00000000-0000-0000-0000-000000000000	bb1281f4-5a7e-47bb-8add-51912730ce88	{"action":"login","actor_id":"8e289215-ab39-43c2-ac2b-2037372019d6","actor_username":"primaria@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-09 23:09:55.285033+00	
00000000-0000-0000-0000-000000000000	75bc4b5f-e54b-495f-9bdd-53df552d8379	{"action":"logout","actor_id":"8e289215-ab39-43c2-ac2b-2037372019d6","actor_username":"primaria@test.com","actor_via_sso":false,"log_type":"account"}	2025-11-09 23:26:12.341294+00	
00000000-0000-0000-0000-000000000000	1c7e3d5a-8182-4fc4-9323-9a9b5e3a9435	{"action":"login","actor_id":"8e289215-ab39-43c2-ac2b-2037372019d6","actor_username":"primaria@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-09 23:26:17.154313+00	
00000000-0000-0000-0000-000000000000	1b4e70c6-db1e-4658-aa16-d37c0f60a228	{"action":"logout","actor_id":"8e289215-ab39-43c2-ac2b-2037372019d6","actor_username":"primaria@test.com","actor_via_sso":false,"log_type":"account"}	2025-11-09 23:26:18.594495+00	
00000000-0000-0000-0000-000000000000	aa2e574f-0d4b-442a-963a-a056a308c606	{"action":"login","actor_id":"f402990f-13eb-4197-a30d-54eb34d5a3d8","actor_username":"secundaria@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-09 23:26:25.301511+00	
00000000-0000-0000-0000-000000000000	f0e00440-712f-4ded-b0ea-00cf424e6a6c	{"action":"logout","actor_id":"f402990f-13eb-4197-a30d-54eb34d5a3d8","actor_username":"secundaria@test.com","actor_via_sso":false,"log_type":"account"}	2025-11-09 23:27:42.663156+00	
00000000-0000-0000-0000-000000000000	feb26e18-6537-491f-a8e3-d92e3f1ac9f0	{"action":"login","actor_id":"e9b51bb1-0ed5-45d1-b7bb-3566ca21089f","actor_username":"bachillerato@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-09 23:27:51.373935+00	
00000000-0000-0000-0000-000000000000	54bd06f9-1dd3-42a7-a5f3-c2f4b182b43a	{"action":"logout","actor_id":"e9b51bb1-0ed5-45d1-b7bb-3566ca21089f","actor_username":"bachillerato@test.com","actor_via_sso":false,"log_type":"account"}	2025-11-09 23:28:35.120188+00	
00000000-0000-0000-0000-000000000000	1a3d55f2-6540-47d5-90a7-d5f15b40714e	{"action":"login","actor_id":"8e289215-ab39-43c2-ac2b-2037372019d6","actor_username":"primaria@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-09 23:29:30.671379+00	
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
260008e5-d5ce-4ebd-bfd5-5a0885c0a944	260008e5-d5ce-4ebd-bfd5-5a0885c0a944	{"sub": "260008e5-d5ce-4ebd-bfd5-5a0885c0a944", "email": "123123123123@123.com", "last_name": "123", "first_name": "123", "email_verified": false, "phone_verified": false, "education_level": "primaria"}	email	2025-11-08 22:33:29.440825+00	2025-11-08 22:33:29.440855+00	2025-11-08 22:33:29.440855+00	876f4317-75ba-4f45-b9b0-df8e5b04575d
c09206db-047a-4ee7-9029-03ea10e4f2a9	c09206db-047a-4ee7-9029-03ea10e4f2a9	{"sub": "c09206db-047a-4ee7-9029-03ea10e4f2a9", "email": "123123123123@1233.com", "last_name": "123", "first_name": "123", "email_verified": false, "phone_verified": false, "education_level": "primaria"}	email	2025-11-08 22:34:38.031566+00	2025-11-08 22:34:38.031616+00	2025-11-08 22:34:38.031616+00	44035e63-bd94-4222-a0e1-1f076d250b99
7c9da78d-8a33-4189-aed3-4335e4ccb381	7c9da78d-8a33-4189-aed3-4335e4ccb381	{"sub": "7c9da78d-8a33-4189-aed3-4335e4ccb381", "email": "123123121233123@1233123.com", "last_name": "123", "first_name": "123", "email_verified": false, "phone_verified": false, "education_level": "primaria"}	email	2025-11-08 22:35:35.491169+00	2025-11-08 22:35:35.491216+00	2025-11-08 22:35:35.491216+00	8de18218-cb26-4360-a704-be07faf2a5f4
42b321bf-086a-4794-ac3c-270f88b06452	42b321bf-086a-4794-ac3c-270f88b06452	{"sub": "42b321bf-086a-4794-ac3c-270f88b06452", "email": "xd@gmail.com", "last_name": "22", "first_name": "22", "email_verified": false, "phone_verified": false, "education_level": "preescolar"}	email	2025-11-08 23:07:56.954086+00	2025-11-08 23:07:56.954154+00	2025-11-08 23:07:56.954154+00	543a4737-b0c7-43ac-b920-cface64afc3f
5f270ece-a534-494c-9ff9-c5c4ddd39a1c	5f270ece-a534-494c-9ff9-c5c4ddd39a1c	{"sub": "5f270ece-a534-494c-9ff9-c5c4ddd39a1c", "email": "123123@p.com", "last_name": "123", "first_name": "123", "email_verified": false, "phone_verified": false, "education_level": "preescolar"}	email	2025-11-08 23:10:58.877152+00	2025-11-08 23:10:58.877186+00	2025-11-08 23:10:58.877186+00	502b6717-ff53-4ca6-909b-ce9985a9fde6
daa0938b-9089-40cf-9fee-72d6a71428d1	daa0938b-9089-40cf-9fee-72d6a71428d1	{"sub": "daa0938b-9089-40cf-9fee-72d6a71428d1", "email": "123333@33.com", "last_name": "Vega Barbosa", "first_name": "Jaime Alejandro", "email_verified": false, "phone_verified": false, "education_level": "preescolar"}	email	2025-11-08 23:20:33.223835+00	2025-11-08 23:20:33.223913+00	2025-11-08 23:20:33.223913+00	62346452-bb14-4ca8-a9fa-4dcc0cb4f912
64daea70-5695-4a52-bd11-018dfe062416	64daea70-5695-4a52-bd11-018dfe062416	{"sub": "64daea70-5695-4a52-bd11-018dfe062416", "email": "1@1.com", "last_name": "1", "first_name": "1", "email_verified": false, "phone_verified": false, "education_level": "preescolar"}	email	2025-11-08 23:21:25.907599+00	2025-11-08 23:21:25.907661+00	2025-11-08 23:21:25.907661+00	29b96ff7-87ec-4494-8a8b-9da7e8f192ed
3792262f-7ece-4471-a1f1-386e3212f3f9	3792262f-7ece-4471-a1f1-386e3212f3f9	{"sub": "3792262f-7ece-4471-a1f1-386e3212f3f9", "email": "1@2.com", "last_name": "3", "first_name": "3", "email_verified": false, "phone_verified": false, "education_level": "preescolar"}	email	2025-11-08 23:21:57.338207+00	2025-11-08 23:21:57.338245+00	2025-11-08 23:21:57.338245+00	e327fcdd-b725-4f5b-8deb-e573969eb45c
08960912-ad37-41a6-a656-3f8a6e6dc3c3	08960912-ad37-41a6-a656-3f8a6e6dc3c3	{"sub": "08960912-ad37-41a6-a656-3f8a6e6dc3c3", "email": "3@4.com", "last_name": "2", "first_name": "1", "email_verified": false, "phone_verified": false, "education_level": "preescolar"}	email	2025-11-08 23:23:51.765549+00	2025-11-08 23:23:51.76562+00	2025-11-08 23:23:51.76562+00	df282482-c441-4581-a6e0-2899d49d7073
a1baa378-ad37-494b-9025-bfdf19854e01	a1baa378-ad37-494b-9025-bfdf19854e01	{"sub": "a1baa378-ad37-494b-9025-bfdf19854e01", "email": "13@1.com", "last_name": "4", "first_name": "4", "email_verified": false, "phone_verified": false, "education_level": "preescolar"}	email	2025-11-08 23:24:28.808633+00	2025-11-08 23:24:28.808696+00	2025-11-08 23:24:28.808696+00	72f5f5b4-fdb9-49c9-bc08-3dfd50b26b89
2ea699c4-a13a-4fc5-9311-2ea5fb7132fd	2ea699c4-a13a-4fc5-9311-2ea5fb7132fd	{"sub": "2ea699c4-a13a-4fc5-9311-2ea5fb7132fd", "email": "3@2.com", "last_name": "3", "first_name": "3", "email_verified": false, "phone_verified": false, "education_level": "primaria"}	email	2025-11-08 23:25:49.537387+00	2025-11-08 23:25:49.53746+00	2025-11-08 23:25:49.53746+00	543f02e2-6404-4d0d-a205-7d48ee7faf83
4a0103e6-deb1-4acb-baca-b73740fa6e16	4a0103e6-deb1-4acb-baca-b73740fa6e16	{"sub": "4a0103e6-deb1-4acb-baca-b73740fa6e16", "email": "11@1.com", "last_name": "1", "first_name": "1", "email_verified": false, "phone_verified": false, "education_level": "preescolar"}	email	2025-11-08 23:26:48.666583+00	2025-11-08 23:26:48.66662+00	2025-11-08 23:26:48.66662+00	0dcee9c8-6c4e-45eb-9e98-81fc25693c66
4631168f-980a-4415-8377-b4cad2228672	4631168f-980a-4415-8377-b4cad2228672	{"sub": "4631168f-980a-4415-8377-b4cad2228672", "email": "123@l.com", "last_name": "3", "first_name": "3", "email_verified": false, "phone_verified": false, "education_level": "preescolar"}	email	2025-11-08 23:27:35.377919+00	2025-11-08 23:27:35.377958+00	2025-11-08 23:27:35.377958+00	9cc6703d-a66d-4524-a705-04350c5013bf
80be71f8-5be6-4399-91f9-05c2f704d58a	80be71f8-5be6-4399-91f9-05c2f704d58a	{"sub": "80be71f8-5be6-4399-91f9-05c2f704d58a", "email": "123@w.com", "last_name": "23", "first_name": "3 2", "email_verified": false, "phone_verified": false, "education_level": "preescolar"}	email	2025-11-08 23:33:43.595844+00	2025-11-08 23:33:43.595935+00	2025-11-08 23:33:43.595935+00	ef1721e6-0d4d-47cf-84bf-4fc0c3ba5ec2
bdb3801f-7a27-4096-806f-d20f595ea800	bdb3801f-7a27-4096-806f-d20f595ea800	{"sub": "bdb3801f-7a27-4096-806f-d20f595ea800", "email": "123@k.com", "last_name": "32", "first_name": "32", "email_verified": false, "phone_verified": false, "education_level": "preescolar"}	email	2025-11-08 23:35:31.352472+00	2025-11-08 23:35:31.352508+00	2025-11-08 23:35:31.352508+00	c62cf6b3-a028-4c3e-a982-e2501ece1d88
fc8c9557-d9c7-4e50-80ae-1b2656e90072	fc8c9557-d9c7-4e50-80ae-1b2656e90072	{"sub": "fc8c9557-d9c7-4e50-80ae-1b2656e90072", "email": "123@k3.com", "last_name": "32", "first_name": "32", "email_verified": false, "phone_verified": false, "education_level": "preescolar"}	email	2025-11-08 23:36:42.889971+00	2025-11-08 23:36:42.890001+00	2025-11-08 23:36:42.890001+00	c20d89f7-05e3-4bea-a199-9f0e0dcdfa2a
271612a2-3a45-4b89-bb74-c5046017fdfa	271612a2-3a45-4b89-bb74-c5046017fdfa	{"sub": "271612a2-3a45-4b89-bb74-c5046017fdfa", "email": "3@6.com", "last_name": "2332", "first_name": "213", "email_verified": false, "phone_verified": false, "education_level": "preescolar"}	email	2025-11-08 23:38:36.695692+00	2025-11-08 23:38:36.69573+00	2025-11-08 23:38:36.69573+00	3f021094-b1e1-4a37-a6c7-ad388a98b6c7
8e289215-ab39-43c2-ac2b-2037372019d6	8e289215-ab39-43c2-ac2b-2037372019d6	{"sub": "8e289215-ab39-43c2-ac2b-2037372019d6", "email": "primaria@test.com", "last_name": "Vega Barbosa", "first_name": "Jaime Alejandro", "email_verified": false, "phone_verified": false, "education_level": "primaria"}	email	2025-11-08 23:43:05.641577+00	2025-11-08 23:43:05.641607+00	2025-11-08 23:43:05.641607+00	7ab8f968-0457-4c75-bd5a-0da6840af1d8
05601181-af76-4acd-bc60-33e43ec5f4b3	05601181-af76-4acd-bc60-33e43ec5f4b3	{"sub": "05601181-af76-4acd-bc60-33e43ec5f4b3", "email": "alfin@dios.com", "last_name": "Vega Barbosa", "first_name": "Jaime Alejandro", "email_verified": false, "phone_verified": false, "education_level": "preescolar"}	email	2025-11-08 23:49:09.029684+00	2025-11-08 23:49:09.029724+00	2025-11-08 23:49:09.029724+00	cf70a781-47f1-41bc-9f94-4093c4db95c6
0a48868e-8222-49d7-98ea-67d82af804ba	0a48868e-8222-49d7-98ea-67d82af804ba	{"sub": "0a48868e-8222-49d7-98ea-67d82af804ba", "email": "123@123123123141341232123.com", "last_name": "Vega Barbosa", "first_name": "Jaime Alejandro", "email_verified": false, "phone_verified": false, "education_level": "preescolar"}	email	2025-11-09 01:00:43.513769+00	2025-11-09 01:00:43.513834+00	2025-11-09 01:00:43.513834+00	f8b44255-2db3-450d-8f27-bc9af43e60f3
f00b7c3c-9335-4511-9764-78fec94700d3	f00b7c3c-9335-4511-9764-78fec94700d3	{"sub": "f00b7c3c-9335-4511-9764-78fec94700d3", "email": "primaria@test21.com", "last_name": "test", "first_name": "Primaria ", "email_verified": false, "phone_verified": false, "education_level": "primaria"}	email	2025-11-09 01:03:30.691974+00	2025-11-09 01:03:30.69201+00	2025-11-09 01:03:30.69201+00	3cd46582-7ad7-4114-a21c-3bc09d38fc38
f402990f-13eb-4197-a30d-54eb34d5a3d8	f402990f-13eb-4197-a30d-54eb34d5a3d8	{"sub": "f402990f-13eb-4197-a30d-54eb34d5a3d8", "email": "secundaria@test.com", "last_name": "Vega Barbosa", "first_name": "Jaime Alejandro", "email_verified": false, "phone_verified": false, "education_level": "secundaria"}	email	2025-11-09 01:38:31.440334+00	2025-11-09 01:38:31.440371+00	2025-11-09 01:38:31.440371+00	c7130465-7151-4884-931c-4aba91fe57a7
e9b51bb1-0ed5-45d1-b7bb-3566ca21089f	e9b51bb1-0ed5-45d1-b7bb-3566ca21089f	{"sub": "e9b51bb1-0ed5-45d1-b7bb-3566ca21089f", "email": "bachillerato@test.com", "last_name": "Vega Barbosa", "first_name": "Jaime Alejandro", "email_verified": false, "phone_verified": false, "education_level": "bachillerato"}	email	2025-11-09 01:49:14.375534+00	2025-11-09 01:49:14.37556+00	2025-11-09 01:49:14.37556+00	3e560b96-dd44-4076-9073-243376a2144e
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
a24a843d-a51d-4798-8477-738751fa2213	2025-11-08 22:33:29.467679+00	2025-11-08 22:33:29.467679+00	password	c05eb4af-658b-4558-b8af-e788dfa753a0
3695394e-e1aa-4ed6-88a3-89a783b243eb	2025-11-08 22:34:38.060879+00	2025-11-08 22:34:38.060879+00	password	09b922e7-3f4b-4cc2-b52a-473be97d3d0f
88bcb14e-39ce-49f9-b7d8-37b5296b3f2d	2025-11-08 22:35:35.519796+00	2025-11-08 22:35:35.519796+00	password	219880f4-3dcb-43de-a39e-b6d5e694e08a
f9a94aaf-2a3a-40a8-b518-5379dc98c023	2025-11-08 23:07:56.981592+00	2025-11-08 23:07:56.981592+00	password	a24bd8b7-a61c-4fd7-868f-4ffc1db2af60
5060ee4d-356e-4590-b400-5cff233f4a4e	2025-11-08 23:10:58.904162+00	2025-11-08 23:10:58.904162+00	password	bba23a87-94f0-40db-b59d-e49161f9b3b0
a0230f6b-8bb6-4678-9e7f-fe63d029f36b	2025-11-08 23:20:33.251071+00	2025-11-08 23:20:33.251071+00	password	6a657766-2d4b-48b4-a2a5-18e470188ef1
270b3075-ca51-4925-aafe-d6871d6d1e95	2025-11-08 23:21:25.933111+00	2025-11-08 23:21:25.933111+00	password	3e6ffc32-1bfc-4ca2-9bee-0d557622097b
a0036e5b-a64d-4563-828a-91f3f4001965	2025-11-08 23:21:57.366191+00	2025-11-08 23:21:57.366191+00	password	ebacf6d3-a552-4f72-ad4e-9ef6283cbde6
fb59b29d-7db9-4fdc-aea6-19976391e262	2025-11-08 23:23:51.79344+00	2025-11-08 23:23:51.79344+00	password	011f4374-a83d-463d-9537-32525239c09b
f1c6ac45-d7ea-43c7-bfae-32b98d4b7361	2025-11-08 23:24:28.843834+00	2025-11-08 23:24:28.843834+00	password	a0d5ab02-95f7-4837-8b2a-62e51443d331
ec6d52f7-4177-4139-9113-23dda90ad2de	2025-11-08 23:25:49.562834+00	2025-11-08 23:25:49.562834+00	password	90216949-3c0f-4e3d-a657-12fd8dcffee2
f6a2edc1-190f-45c2-b515-6baf4fdc5548	2025-11-08 23:26:48.693965+00	2025-11-08 23:26:48.693965+00	password	216a461a-aa55-454b-9742-afb79e828035
7ece5645-10bc-4d91-8cd0-8bb143993862	2025-11-08 23:27:35.404401+00	2025-11-08 23:27:35.404401+00	password	14d34b38-bab6-4791-815d-186d197ca6db
34f6f5e2-8a56-4691-be5c-87ad32f959e7	2025-11-08 23:33:43.623546+00	2025-11-08 23:33:43.623546+00	password	79352388-0221-4b64-a66d-b4cae7c84388
d3055d3b-316e-4a42-b944-fab5f467b838	2025-11-08 23:35:31.382741+00	2025-11-08 23:35:31.382741+00	password	04094940-74de-4b98-a534-6c32d70f9d04
e5265c02-814b-48ba-ae90-0417039d94e4	2025-11-09 23:29:30.677381+00	2025-11-09 23:29:30.677381+00	password	0224a381-ae2f-4818-a1db-639a6704c96b
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid, last_webauthn_challenge_data) FROM stdin;
\.


--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_authorizations (id, authorization_id, client_id, user_id, redirect_uri, scope, state, resource, code_challenge, code_challenge_method, response_type, status, authorization_code, created_at, expires_at, approved_at) FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_clients (id, client_secret_hash, registration_type, redirect_uris, grant_types, client_name, client_uri, logo_uri, created_at, updated_at, deleted_at, client_type) FROM stdin;
\.


--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_consents (id, user_id, client_id, scopes, granted_at, revoked_at) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
00000000-0000-0000-0000-000000000000	13	gnnzwq2ntkul	260008e5-d5ce-4ebd-bfd5-5a0885c0a944	f	2025-11-08 22:33:29.464341+00	2025-11-08 22:33:29.464341+00	\N	a24a843d-a51d-4798-8477-738751fa2213
00000000-0000-0000-0000-000000000000	14	cvga44zc4fq4	c09206db-047a-4ee7-9029-03ea10e4f2a9	f	2025-11-08 22:34:38.0578+00	2025-11-08 22:34:38.0578+00	\N	3695394e-e1aa-4ed6-88a3-89a783b243eb
00000000-0000-0000-0000-000000000000	15	ecuwmzaokyrw	7c9da78d-8a33-4189-aed3-4335e4ccb381	f	2025-11-08 22:35:35.516774+00	2025-11-08 22:35:35.516774+00	\N	88bcb14e-39ce-49f9-b7d8-37b5296b3f2d
00000000-0000-0000-0000-000000000000	16	w2hldjlzjumt	42b321bf-086a-4794-ac3c-270f88b06452	f	2025-11-08 23:07:56.978327+00	2025-11-08 23:07:56.978327+00	\N	f9a94aaf-2a3a-40a8-b518-5379dc98c023
00000000-0000-0000-0000-000000000000	17	xidrb5dregtc	5f270ece-a534-494c-9ff9-c5c4ddd39a1c	f	2025-11-08 23:10:58.901525+00	2025-11-08 23:10:58.901525+00	\N	5060ee4d-356e-4590-b400-5cff233f4a4e
00000000-0000-0000-0000-000000000000	18	w3w6lse6rrvv	daa0938b-9089-40cf-9fee-72d6a71428d1	f	2025-11-08 23:20:33.248556+00	2025-11-08 23:20:33.248556+00	\N	a0230f6b-8bb6-4678-9e7f-fe63d029f36b
00000000-0000-0000-0000-000000000000	19	wmynzjccn3uj	64daea70-5695-4a52-bd11-018dfe062416	f	2025-11-08 23:21:25.930929+00	2025-11-08 23:21:25.930929+00	\N	270b3075-ca51-4925-aafe-d6871d6d1e95
00000000-0000-0000-0000-000000000000	20	tcxiuv7z47ia	3792262f-7ece-4471-a1f1-386e3212f3f9	f	2025-11-08 23:21:57.363335+00	2025-11-08 23:21:57.363335+00	\N	a0036e5b-a64d-4563-828a-91f3f4001965
00000000-0000-0000-0000-000000000000	21	aj7oai5nbqcw	08960912-ad37-41a6-a656-3f8a6e6dc3c3	f	2025-11-08 23:23:51.790846+00	2025-11-08 23:23:51.790846+00	\N	fb59b29d-7db9-4fdc-aea6-19976391e262
00000000-0000-0000-0000-000000000000	22	3xfxbyjc7nf3	a1baa378-ad37-494b-9025-bfdf19854e01	f	2025-11-08 23:24:28.841459+00	2025-11-08 23:24:28.841459+00	\N	f1c6ac45-d7ea-43c7-bfae-32b98d4b7361
00000000-0000-0000-0000-000000000000	23	ihlf2w423u4z	2ea699c4-a13a-4fc5-9311-2ea5fb7132fd	f	2025-11-08 23:25:49.560568+00	2025-11-08 23:25:49.560568+00	\N	ec6d52f7-4177-4139-9113-23dda90ad2de
00000000-0000-0000-0000-000000000000	24	d4cfdvic5gp3	4a0103e6-deb1-4acb-baca-b73740fa6e16	f	2025-11-08 23:26:48.691141+00	2025-11-08 23:26:48.691141+00	\N	f6a2edc1-190f-45c2-b515-6baf4fdc5548
00000000-0000-0000-0000-000000000000	25	7ay7jvrzrgsr	4631168f-980a-4415-8377-b4cad2228672	f	2025-11-08 23:27:35.402046+00	2025-11-08 23:27:35.402046+00	\N	7ece5645-10bc-4d91-8cd0-8bb143993862
00000000-0000-0000-0000-000000000000	26	tiskqtxtmzfs	80be71f8-5be6-4399-91f9-05c2f704d58a	f	2025-11-08 23:33:43.621045+00	2025-11-08 23:33:43.621045+00	\N	34f6f5e2-8a56-4691-be5c-87ad32f959e7
00000000-0000-0000-0000-000000000000	27	fiblqegpxuz6	bdb3801f-7a27-4096-806f-d20f595ea800	f	2025-11-08 23:35:31.379941+00	2025-11-08 23:35:31.379941+00	\N	d3055d3b-316e-4a42-b944-fab5f467b838
00000000-0000-0000-0000-000000000000	78	pmoh4a6n7ehi	8e289215-ab39-43c2-ac2b-2037372019d6	f	2025-11-09 23:29:30.675195+00	2025-11-09 23:29:30.675195+00	\N	e5265c02-814b-48ba-ae90-0417039d94e4
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
20250717082212
20250731150234
20250804100000
20250901200500
20250903112500
20250904133000
20250925093508
20251007112900
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag, oauth_client_id, refresh_token_hmac_key, refresh_token_counter) FROM stdin;
a24a843d-a51d-4798-8477-738751fa2213	260008e5-d5ce-4ebd-bfd5-5a0885c0a944	2025-11-08 22:33:29.462027+00	2025-11-08 22:33:29.462027+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	172.18.0.1	\N	\N	\N	\N
3695394e-e1aa-4ed6-88a3-89a783b243eb	c09206db-047a-4ee7-9029-03ea10e4f2a9	2025-11-08 22:34:38.055323+00	2025-11-08 22:34:38.055323+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	172.18.0.1	\N	\N	\N	\N
88bcb14e-39ce-49f9-b7d8-37b5296b3f2d	7c9da78d-8a33-4189-aed3-4335e4ccb381	2025-11-08 22:35:35.513334+00	2025-11-08 22:35:35.513334+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	172.18.0.1	\N	\N	\N	\N
f9a94aaf-2a3a-40a8-b518-5379dc98c023	42b321bf-086a-4794-ac3c-270f88b06452	2025-11-08 23:07:56.975747+00	2025-11-08 23:07:56.975747+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	172.18.0.1	\N	\N	\N	\N
5060ee4d-356e-4590-b400-5cff233f4a4e	5f270ece-a534-494c-9ff9-c5c4ddd39a1c	2025-11-08 23:10:58.899277+00	2025-11-08 23:10:58.899277+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	172.18.0.1	\N	\N	\N	\N
a0230f6b-8bb6-4678-9e7f-fe63d029f36b	daa0938b-9089-40cf-9fee-72d6a71428d1	2025-11-08 23:20:33.245705+00	2025-11-08 23:20:33.245705+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	172.18.0.1	\N	\N	\N	\N
270b3075-ca51-4925-aafe-d6871d6d1e95	64daea70-5695-4a52-bd11-018dfe062416	2025-11-08 23:21:25.928775+00	2025-11-08 23:21:25.928775+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	172.18.0.1	\N	\N	\N	\N
a0036e5b-a64d-4563-828a-91f3f4001965	3792262f-7ece-4471-a1f1-386e3212f3f9	2025-11-08 23:21:57.360271+00	2025-11-08 23:21:57.360271+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	172.18.0.1	\N	\N	\N	\N
fb59b29d-7db9-4fdc-aea6-19976391e262	08960912-ad37-41a6-a656-3f8a6e6dc3c3	2025-11-08 23:23:51.788321+00	2025-11-08 23:23:51.788321+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	172.18.0.1	\N	\N	\N	\N
f1c6ac45-d7ea-43c7-bfae-32b98d4b7361	a1baa378-ad37-494b-9025-bfdf19854e01	2025-11-08 23:24:28.838697+00	2025-11-08 23:24:28.838697+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	172.18.0.1	\N	\N	\N	\N
ec6d52f7-4177-4139-9113-23dda90ad2de	2ea699c4-a13a-4fc5-9311-2ea5fb7132fd	2025-11-08 23:25:49.558294+00	2025-11-08 23:25:49.558294+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	172.18.0.1	\N	\N	\N	\N
f6a2edc1-190f-45c2-b515-6baf4fdc5548	4a0103e6-deb1-4acb-baca-b73740fa6e16	2025-11-08 23:26:48.688765+00	2025-11-08 23:26:48.688765+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	172.18.0.1	\N	\N	\N	\N
7ece5645-10bc-4d91-8cd0-8bb143993862	4631168f-980a-4415-8377-b4cad2228672	2025-11-08 23:27:35.399398+00	2025-11-08 23:27:35.399398+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	172.18.0.1	\N	\N	\N	\N
34f6f5e2-8a56-4691-be5c-87ad32f959e7	80be71f8-5be6-4399-91f9-05c2f704d58a	2025-11-08 23:33:43.618179+00	2025-11-08 23:33:43.618179+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	172.18.0.1	\N	\N	\N	\N
d3055d3b-316e-4a42-b944-fab5f467b838	bdb3801f-7a27-4096-806f-d20f595ea800	2025-11-08 23:35:31.377223+00	2025-11-08 23:35:31.377223+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	172.18.0.1	\N	\N	\N	\N
e5265c02-814b-48ba-ae90-0417039d94e4	8e289215-ab39-43c2-ac2b-2037372019d6	2025-11-09 23:29:30.672895+00	2025-11-09 23:29:30.672895+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	172.18.0.1	\N	\N	\N	\N
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at, disabled) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
00000000-0000-0000-0000-000000000000	11111111-1111-1111-1111-111111111111	\N	authenticated	estudiante@test.com	$2a$10$RcH.pGZdUGJPnE3FWzYJKOOmP7qJ0Vqg3i3YHq9tXSQ7tLKJGTJTK	2025-11-08 22:04:18.15933+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	{"provider": "email", "providers": ["email"]}	{}	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	22222222-2222-2222-2222-222222222222	\N	authenticated	profesor@test.com	$2a$10$RcH.pGZdUGJPnE3FWzYJKOOmP7qJ0Vqg3i3YHq9tXSQ7tLKJGTJTK	2025-11-08 22:04:18.15933+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	{"provider": "email", "providers": ["email"]}	{}	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	33333333-3333-3333-3333-333333333333	\N	authenticated	admin@test.com	$2a$10$RcH.pGZdUGJPnE3FWzYJKOOmP7qJ0Vqg3i3YHq9tXSQ7tLKJGTJTK	2025-11-08 22:04:18.15933+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	{"provider": "email", "providers": ["email"]}	{}	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	daa0938b-9089-40cf-9fee-72d6a71428d1	authenticated	authenticated	123333@33.com	$2a$10$r2CD26QvgRPW3cffQUCB0O5/o2FlX7GtNSTFzUNYgmzZfVLV7oaPy	2025-11-08 23:20:33.22864+00	\N		\N		\N			\N	2025-11-08 23:20:33.245611+00	{"provider": "email", "providers": ["email"]}	{"sub": "daa0938b-9089-40cf-9fee-72d6a71428d1", "email": "123333@33.com", "last_name": "Vega Barbosa", "first_name": "Jaime Alejandro", "email_verified": true, "phone_verified": false, "education_level": "preescolar"}	\N	2025-11-08 23:20:33.217636+00	2025-11-08 23:20:33.250081+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	2ea699c4-a13a-4fc5-9311-2ea5fb7132fd	authenticated	authenticated	3@2.com	$2a$10$moFPotlEKSgVBdJjHitp3uz4VgC0.GQPuHvGgYtC3rnBpCHpIpRxC	2025-11-08 23:25:49.542229+00	\N		\N		\N			\N	2025-11-08 23:25:49.558234+00	{"provider": "email", "providers": ["email"]}	{"sub": "2ea699c4-a13a-4fc5-9311-2ea5fb7132fd", "email": "3@2.com", "last_name": "3", "first_name": "3", "email_verified": true, "phone_verified": false, "education_level": "primaria"}	\N	2025-11-08 23:25:49.530687+00	2025-11-08 23:25:49.562035+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	3792262f-7ece-4471-a1f1-386e3212f3f9	authenticated	authenticated	1@2.com	$2a$10$nzW0zS5sGdw5CRBKfbcEmeZ91tJ82M9dpQcygDlCNG/BRCr/wQCM.	2025-11-08 23:21:57.342933+00	\N		\N		\N			\N	2025-11-08 23:21:57.360182+00	{"provider": "email", "providers": ["email"]}	{"sub": "3792262f-7ece-4471-a1f1-386e3212f3f9", "email": "1@2.com", "last_name": "3", "first_name": "3", "email_verified": true, "phone_verified": false, "education_level": "preescolar"}	\N	2025-11-08 23:21:57.33203+00	2025-11-08 23:21:57.364922+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	7c9da78d-8a33-4189-aed3-4335e4ccb381	authenticated	authenticated	123123121233123@1233123.com	$2a$10$2bdaXAcaGMxDgKoCcxNQ.e/pUTePZr2cZbqqu81ESyqVD1WhZWFIm	2025-11-08 22:35:35.495891+00	\N		\N		\N			\N	2025-11-08 22:35:35.513224+00	{"provider": "email", "providers": ["email"]}	{"sub": "7c9da78d-8a33-4189-aed3-4335e4ccb381", "email": "123123121233123@1233123.com", "last_name": "123", "first_name": "123", "email_verified": true, "phone_verified": false, "education_level": "primaria"}	\N	2025-11-08 22:35:35.484993+00	2025-11-08 22:35:35.518635+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	260008e5-d5ce-4ebd-bfd5-5a0885c0a944	authenticated	authenticated	123123123123@123.com	$2a$10$6HLYvt0qGAx6T0n1Ydv/SOR17kDVUSWEk4rrb4rvRGJrHpOlzjV7u	2025-11-08 22:33:29.445036+00	\N		\N		\N			\N	2025-11-08 22:33:29.461959+00	{"provider": "email", "providers": ["email"]}	{"sub": "260008e5-d5ce-4ebd-bfd5-5a0885c0a944", "email": "123123123123@123.com", "last_name": "123", "first_name": "123", "email_verified": true, "phone_verified": false, "education_level": "primaria"}	\N	2025-11-08 22:33:29.434924+00	2025-11-08 22:33:29.466387+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	5f270ece-a534-494c-9ff9-c5c4ddd39a1c	authenticated	authenticated	123123@p.com	$2a$10$3xIT9RCvGAKF5M5VdeoUoe4qUdEAFXgb/Y6vt.MXuIZRjRkRfGTqa	2025-11-08 23:10:58.881898+00	\N		\N		\N			\N	2025-11-08 23:10:58.8992+00	{"provider": "email", "providers": ["email"]}	{"sub": "5f270ece-a534-494c-9ff9-c5c4ddd39a1c", "email": "123123@p.com", "last_name": "123", "first_name": "123", "email_verified": true, "phone_verified": false, "education_level": "preescolar"}	\N	2025-11-08 23:10:58.871133+00	2025-11-08 23:10:58.90339+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	64daea70-5695-4a52-bd11-018dfe062416	authenticated	authenticated	1@1.com	$2a$10$/bj4FTElV3fS1eE2HNyKEudsFdS5tJPkpE/LgDOCcJfUTy62JmEW2	2025-11-08 23:21:25.912399+00	\N		\N		\N			\N	2025-11-08 23:21:25.928721+00	{"provider": "email", "providers": ["email"]}	{"sub": "64daea70-5695-4a52-bd11-018dfe062416", "email": "1@1.com", "last_name": "1", "first_name": "1", "email_verified": true, "phone_verified": false, "education_level": "preescolar"}	\N	2025-11-08 23:21:25.898475+00	2025-11-08 23:21:25.932212+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	c09206db-047a-4ee7-9029-03ea10e4f2a9	authenticated	authenticated	123123123123@1233.com	$2a$10$vj/7Jv6B5kjVVsfBP.LcGerLVVtu2hmzObitn8Hxw8YOSc4pPVzaG	2025-11-08 22:34:38.037135+00	\N		\N		\N			\N	2025-11-08 22:34:38.055246+00	{"provider": "email", "providers": ["email"]}	{"sub": "c09206db-047a-4ee7-9029-03ea10e4f2a9", "email": "123123123123@1233.com", "last_name": "123", "first_name": "123", "email_verified": true, "phone_verified": false, "education_level": "primaria"}	\N	2025-11-08 22:34:38.023789+00	2025-11-08 22:34:38.060039+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	42b321bf-086a-4794-ac3c-270f88b06452	authenticated	authenticated	xd@gmail.com	$2a$10$cNddnRu4B1u1Kd9Nh7kKiedgXtHETPu1f7xG3uBsYSSNoKBz3kRNa	2025-11-08 23:07:56.959226+00	\N		\N		\N			\N	2025-11-08 23:07:56.975692+00	{"provider": "email", "providers": ["email"]}	{"sub": "42b321bf-086a-4794-ac3c-270f88b06452", "email": "xd@gmail.com", "last_name": "22", "first_name": "22", "email_verified": true, "phone_verified": false, "education_level": "preescolar"}	\N	2025-11-08 23:07:56.947929+00	2025-11-08 23:07:56.980719+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	4a0103e6-deb1-4acb-baca-b73740fa6e16	authenticated	authenticated	11@1.com	$2a$10$mUOgWrh1v3wGttqNWWy/BOQyN3VUTy247RUQyVv3knT2dIPIYylZ.	2025-11-08 23:26:48.67116+00	\N		\N		\N			\N	2025-11-08 23:26:48.688673+00	{"provider": "email", "providers": ["email"]}	{"sub": "4a0103e6-deb1-4acb-baca-b73740fa6e16", "email": "11@1.com", "last_name": "1", "first_name": "1", "email_verified": true, "phone_verified": false, "education_level": "preescolar"}	\N	2025-11-08 23:26:48.660236+00	2025-11-08 23:26:48.692953+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	08960912-ad37-41a6-a656-3f8a6e6dc3c3	authenticated	authenticated	3@4.com	$2a$10$5Lb5jGoXatxMfF3fmxalwe1Wev/hniq0i7NMzmamyLmbavVKD3F02	2025-11-08 23:23:51.769938+00	\N		\N		\N			\N	2025-11-08 23:23:51.78822+00	{"provider": "email", "providers": ["email"]}	{"sub": "08960912-ad37-41a6-a656-3f8a6e6dc3c3", "email": "3@4.com", "last_name": "2", "first_name": "1", "email_verified": true, "phone_verified": false, "education_level": "preescolar"}	\N	2025-11-08 23:23:51.75971+00	2025-11-08 23:23:51.792437+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	a1baa378-ad37-494b-9025-bfdf19854e01	authenticated	authenticated	13@1.com	$2a$10$hxBe9TzdcfIz1jYtNxT9ceZVZ5Z/f/CvHikYeMca72NH5Bf/lhl7q	2025-11-08 23:24:28.813774+00	\N		\N		\N			\N	2025-11-08 23:24:28.838601+00	{"provider": "email", "providers": ["email"]}	{"sub": "a1baa378-ad37-494b-9025-bfdf19854e01", "email": "13@1.com", "last_name": "4", "first_name": "4", "email_verified": true, "phone_verified": false, "education_level": "preescolar"}	\N	2025-11-08 23:24:28.801837+00	2025-11-08 23:24:28.843075+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	4631168f-980a-4415-8377-b4cad2228672	authenticated	authenticated	123@l.com	$2a$10$vX4TQumDNYPZc0yank8TreT50hjQbPOL2JE3lrCxyvLUrNDrgNQAK	2025-11-08 23:27:35.382511+00	\N		\N		\N			\N	2025-11-08 23:27:35.399338+00	{"provider": "email", "providers": ["email"]}	{"sub": "4631168f-980a-4415-8377-b4cad2228672", "email": "123@l.com", "last_name": "3", "first_name": "3", "email_verified": true, "phone_verified": false, "education_level": "preescolar"}	\N	2025-11-08 23:27:35.370268+00	2025-11-08 23:27:35.403413+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	f402990f-13eb-4197-a30d-54eb34d5a3d8	authenticated	authenticated	secundaria@test.com	$2a$10$EdF5sCgDr3Okt0DSfkg5tOAnhnKCAlOQETbgxp3dlxgTx9LPypsFy	2025-11-09 01:38:31.445631+00	\N		\N		\N			\N	2025-11-09 23:26:25.30298+00	{"provider": "email", "providers": ["email"]}	{"sub": "f402990f-13eb-4197-a30d-54eb34d5a3d8", "email": "secundaria@test.com", "last_name": "Vega Barbosa", "first_name": "Jaime Alejandro", "email_verified": true, "phone_verified": false, "education_level": "secundaria"}	\N	2025-11-09 01:38:31.433166+00	2025-11-09 23:26:25.307408+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	05601181-af76-4acd-bc60-33e43ec5f4b3	authenticated	authenticated	alfin@dios.com	$2a$10$hv7S8lzouf7//SlwyENhyuvfBNU.2t8NK3gv.CTbIpKCaOksTSWZm	2025-11-08 23:49:09.034833+00	\N		\N		\N			\N	2025-11-08 23:49:09.053058+00	{"provider": "email", "providers": ["email"]}	{"sub": "05601181-af76-4acd-bc60-33e43ec5f4b3", "email": "alfin@dios.com", "last_name": "Vega Barbosa", "first_name": "Jaime Alejandro", "email_verified": true, "phone_verified": false, "education_level": "preescolar"}	\N	2025-11-08 23:49:09.0233+00	2025-11-09 00:47:19.55175+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	80be71f8-5be6-4399-91f9-05c2f704d58a	authenticated	authenticated	123@w.com	$2a$10$60fRU5JX9/DbL6llfYGMJeGlnB749PpcD8TewIcXCPBkUQz1NfuOy	2025-11-08 23:33:43.600524+00	\N		\N		\N			\N	2025-11-08 23:33:43.61807+00	{"provider": "email", "providers": ["email"]}	{"sub": "80be71f8-5be6-4399-91f9-05c2f704d58a", "email": "123@w.com", "last_name": "23", "first_name": "3 2", "email_verified": true, "phone_verified": false, "education_level": "preescolar"}	\N	2025-11-08 23:33:43.589481+00	2025-11-08 23:33:43.622712+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	fc8c9557-d9c7-4e50-80ae-1b2656e90072	authenticated	authenticated	123@k3.com	$2a$10$flLR4XfdrlXbzmg4RfuUNeXksybI3E7kcAtOmIuvvCRLV9jHksPJm	2025-11-08 23:36:42.894306+00	\N		\N		\N			\N	2025-11-08 23:36:42.914203+00	{"provider": "email", "providers": ["email"]}	{"sub": "fc8c9557-d9c7-4e50-80ae-1b2656e90072", "email": "123@k3.com", "last_name": "32", "first_name": "32", "email_verified": true, "phone_verified": false, "education_level": "preescolar"}	\N	2025-11-08 23:36:42.884427+00	2025-11-08 23:36:42.922236+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	e9b51bb1-0ed5-45d1-b7bb-3566ca21089f	authenticated	authenticated	bachillerato@test.com	$2a$10$HOrafUvKvGM.XYXjGs6g.O9rLAVV9lo35jeSIEPNYI1ouhGbbg4DO	2025-11-09 01:49:14.379837+00	\N		\N		\N			\N	2025-11-09 23:27:51.37529+00	{"provider": "email", "providers": ["email"]}	{"sub": "e9b51bb1-0ed5-45d1-b7bb-3566ca21089f", "email": "bachillerato@test.com", "last_name": "Vega Barbosa", "first_name": "Jaime Alejandro", "email_verified": true, "phone_verified": false, "education_level": "bachillerato"}	\N	2025-11-09 01:49:14.369894+00	2025-11-09 23:27:51.378745+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	bdb3801f-7a27-4096-806f-d20f595ea800	authenticated	authenticated	123@k.com	$2a$10$H50nNor5uSx4Sfq4eXporupKY/2iS58.Gtq5mqFq8g1MYC/9fgo0m	2025-11-08 23:35:31.356976+00	\N		\N		\N			\N	2025-11-08 23:35:31.377151+00	{"provider": "email", "providers": ["email"]}	{"sub": "bdb3801f-7a27-4096-806f-d20f595ea800", "email": "123@k.com", "last_name": "32", "first_name": "32", "email_verified": true, "phone_verified": false, "education_level": "preescolar"}	\N	2025-11-08 23:35:31.345782+00	2025-11-08 23:35:31.38186+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	8e289215-ab39-43c2-ac2b-2037372019d6	authenticated	authenticated	primaria@test.com	$2a$10$RupQaOPBZtBvy7SiRSEgLOlUEaMgpBIkWMiR2sLWutrr3886s9x9m	2025-11-08 23:43:05.645903+00	\N		\N		\N			\N	2025-11-09 23:29:30.672842+00	{"provider": "email", "providers": ["email"]}	{"sub": "8e289215-ab39-43c2-ac2b-2037372019d6", "email": "primaria@test.com", "last_name": "Vega Barbosa", "first_name": "Jaime Alejandro", "email_verified": true, "phone_verified": false, "education_level": "primaria"}	\N	2025-11-08 23:43:05.636144+00	2025-11-09 23:29:30.676642+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	0a48868e-8222-49d7-98ea-67d82af804ba	authenticated	authenticated	123@123123123141341232123.com	$2a$10$XiLvkEl55zfESyi1rCY0hOJGAfGF9a1UIeveHaV12Do8PLCR.dq7S	2025-11-09 01:00:43.520074+00	\N		\N		\N			\N	2025-11-09 01:00:43.539229+00	{"provider": "email", "providers": ["email"]}	{"sub": "0a48868e-8222-49d7-98ea-67d82af804ba", "email": "123@123123123141341232123.com", "last_name": "Vega Barbosa", "first_name": "Jaime Alejandro", "email_verified": true, "phone_verified": false, "education_level": "preescolar"}	\N	2025-11-09 01:00:43.506651+00	2025-11-09 01:00:43.544457+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	271612a2-3a45-4b89-bb74-c5046017fdfa	authenticated	authenticated	3@6.com	$2a$10$TBokWjUwkMNYtqTP0XykdOqq1yIYpMLB7KiohwyexG/JIv4XpAKSy	2025-11-08 23:38:36.700243+00	\N		\N		\N			\N	2025-11-08 23:38:36.720281+00	{"provider": "email", "providers": ["email"]}	{"sub": "271612a2-3a45-4b89-bb74-c5046017fdfa", "email": "3@6.com", "last_name": "2332", "first_name": "213", "email_verified": true, "phone_verified": false, "education_level": "preescolar"}	\N	2025-11-08 23:38:36.689001+00	2025-11-08 23:38:36.726096+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	f00b7c3c-9335-4511-9764-78fec94700d3	authenticated	authenticated	primaria@test21.com	$2a$10$alnYunXntmfWPvQzn6aHxu.cDcDhogwHdYfyT4Uns07sMirLzDtxK	2025-11-09 01:03:30.696571+00	\N		\N		\N			\N	2025-11-09 01:03:30.713413+00	{"provider": "email", "providers": ["email"]}	{"sub": "f00b7c3c-9335-4511-9764-78fec94700d3", "email": "primaria@test21.com", "last_name": "test", "first_name": "Primaria ", "email_verified": true, "phone_verified": false, "education_level": "primaria"}	\N	2025-11-09 01:03:30.684676+00	2025-11-09 01:03:30.717985+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.courses (id, name, description, education_level, icon, color, created_at, updated_at) FROM stdin;
10000000-0000-0000-0000-000000000001	Señales Básicas	Aprende a reconocer las señales de tránsito más importantes	preescolar	🚦	#22C55E	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
10000000-0000-0000-0000-000000000002	Cruzar la Calle Seguro	Aprende a cruzar la calle de forma segura	preescolar	🚸	#16A34A	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
20000000-0000-0000-0000-000000000001	Señales de Tránsito	Conoce todas las señales de tránsito	primaria	🚦	#16A34A	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
20000000-0000-0000-0000-000000000002	Seguridad Peatonal	Aprende las reglas para peatones	primaria	🚶	#15803D	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
20000000-0000-0000-0000-000000000003	Zonas Escolares	Seguridad en zonas escolares	primaria	🏫	#166534	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
30000000-0000-0000-0000-000000000001	Educación Vial Integral	Conocimientos completos de educación vial	secundaria	🚴	#15803D	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
30000000-0000-0000-0000-000000000002	Seguridad en Bicicleta	Aprende a circular seguro en bicicleta	secundaria	🚲	#166534	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
40000000-0000-0000-0000-000000000001	Preparación Licencia de Conducir	Prepárate para obtener tu licencia	bachillerato	🚗	#166534	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
\.


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profiles (id, email, first_name, last_name, education_level, created_at, updated_at) FROM stdin;
f00b7c3c-9335-4511-9764-78fec94700d3	primaria@test21.com	Primaria 	test	primaria	2025-11-09 01:03:30.788363+00	2025-11-09 01:03:30.788363+00
f402990f-13eb-4197-a30d-54eb34d5a3d8	secundaria@test.com	Jaime Alejandro	Vega Barbosa	secundaria	2025-11-09 01:38:31.534468+00	2025-11-09 01:38:31.534468+00
e9b51bb1-0ed5-45d1-b7bb-3566ca21089f	bachillerato@test.com	Jaime Alejandro	Vega Barbosa	bachillerato	2025-11-09 01:49:14.453929+00	2025-11-09 01:49:14.453929+00
8e289215-ab39-43c2-ac2b-2037372019d6	preescolar@test.com	preescolar	preescolar	preescolar	2025-11-09 23:12:33+00	2025-11-09 23:12:34+00
\.


--
-- Data for Name: routes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.routes (id, course_id, name, description, level_order, game_type, game_config, video_url, model_3d_url, is_certification_level, created_at, updated_at) FROM stdin;
11111111-0000-0000-0000-000000000001	10000000-0000-0000-0000-000000000001	Introducción a Señales	Conoce las señales más importantes	1	video1	\N	https://www.youtube.com/embed/rnb0fkpeOao	\N	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
11111111-0000-0000-0000-000000000013	10000000-0000-0000-0000-000000000002	Evaluación Final	Demuestra que sabes cruzar	3	quiz	{"questions": 5, "timePerQuestion": 20}	\N	\N	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
22222222-0000-0000-0000-000000000001	20000000-0000-0000-0000-000000000001	Introducción	Conoce las señales de tránsito	1	traffic-signs-intro	{"signTypes": ["preventivas", "reglamentarias", "informativas"]}	\N	\N	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
22222222-0000-0000-0000-000000000002	20000000-0000-0000-0000-000000000001	Desarrollo	Profundiza en las señales	2	traffic-signs-desarrollo	{"questions": 10, "timePerQuestion": 25}	\N	\N	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
22222222-0000-0000-0000-000000000003	20000000-0000-0000-0000-000000000001	Aplicación	Aplica lo aprendido	3	traffic-signs-aplicacion	{"scenarios": 8, "timePerScenario": 30}	\N	\N	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
22222222-0000-0000-0000-000000000004	20000000-0000-0000-0000-000000000001	Certificación	Obtén tu certificado	4	traffic-signs-certificacion	{"questions": 15, "passingScore": 80}	\N	\N	t	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
22222222-0000-0000-0000-000000000011	20000000-0000-0000-0000-000000000002	Video Introductorio	Reglas para peatones	1	video2	\N	https://www.youtube.com/embed/7_UJryJ6UjI	\N	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
22222222-0000-0000-0000-000000000012	20000000-0000-0000-0000-000000000002	Reglas Peatonales	Aprende las reglas	2	pedestrian-rules-desarrollo	{"rules": 10, "interactive": true}	\N	\N	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
22222222-0000-0000-0000-000000000013	20000000-0000-0000-0000-000000000002	Quiz Final	Evaluación de conocimientos	3	quiz	{"questions": 10, "timePerQuestion": 20}	\N	\N	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
33333333-0000-0000-0000-000000000001	30000000-0000-0000-0000-000000000001	Introducción Vial	Conceptos fundamentales	1	introduccionsecundaria	{"topics": ["señales", "normas", "seguridad"]}	\N	\N	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
33333333-0000-0000-0000-000000000002	30000000-0000-0000-0000-000000000001	Reglas Peatonales	Normas para peatones	2	pedestrian-rules-desarrollo	{"questions": 12, "scenarios": 6}	\N	\N	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
33333333-0000-0000-0000-000000000003	30000000-0000-0000-0000-000000000001	Aplicación Práctica	Casos de estudio	3	pedestrian-rules-aplicacion	{"scenarios": 10, "timePerScenario": 30}	\N	\N	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
33333333-0000-0000-0000-000000000004	30000000-0000-0000-0000-000000000001	Certificación	Examen final	4	pedestrian-rules-certificacion	{"questions": 20, "passingScore": 80}	\N	\N	t	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
44444444-0000-0000-0000-000000000001	40000000-0000-0000-0000-000000000001	Introducción a la Conducción	Conceptos básicos de conducir	1	introduccionbachillerato	{"topics": ["controles", "señales", "maniobras"]}	\N	\N	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
44444444-0000-0000-0000-000000000002	40000000-0000-0000-0000-000000000001	Desarrollo Teórico	Teoría de la conducción	2	desarrollobachillerato	{"lessons": 15, "quizzes": 10}	\N	\N	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
44444444-0000-0000-0000-000000000003	40000000-0000-0000-0000-000000000001	Aplicación Práctica	Simulación de manejo	3	aplicacionbachillerato	{"scenarios": 12, "difficulty": "medium"}	\N	\N	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
44444444-0000-0000-0000-000000000004	40000000-0000-0000-0000-000000000001	Examen Teórico	Certificación para licencia	4	quiz	{"questions": 30, "passingScore": 85}	\N	\N	t	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
11111111-0000-0000-0000-000000000002	10000000-0000-0000-0000-000000000001	Peaton Responsable	Aprende a ser un peaton responsable	2	video2	{"pairs": 8, "theme": "traffic-lights", "difficulty": "easy"}	\N	\N	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
11111111-0000-0000-0000-000000000012	10000000-0000-0000-0000-000000000002	Práctica de Cruce	Practica cruzando la calle	2	preescolaraplicacion	{"pairs": 6, "theme": "road-signs", "difficulty": "easy"}	\N	\N	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
11111111-0000-0000-0000-000000000011	10000000-0000-0000-0000-000000000002	Cómo Cruzar Seguro	Aprende los pasos para cruzar	1	preescolarcalle	\N	https://www.youtube.com/embed/7_UJryJ6UjI	\N	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
11111111-0000-0000-0000-000000000003	10000000-0000-0000-0000-000000000001	Quiz de Señales	Demuestra lo que aprendiste	3	quizPreescolar	{"questions": 5, "timePerQuestion": 20}	\N	\N	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
22222222-0000-0000-0000-000000000021	20000000-0000-0000-0000-000000000003	Seguridad Escolar	Conoce las zonas escolares	1	video1	\N	https://www.youtube.com/embed/92ON944bTRo?si=sm4wncOcdiuBMPbW	\N	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
22222222-0000-0000-0000-000000000022	20000000-0000-0000-0000-000000000003	Educacion Vial	Conoce más acerca de educación víal	2	video1	{"pairs": 8, "theme": "road-signs", "difficulty": "medium"}	https://www.youtube.com/embed/-sWnoPUrAJY?si=kXIg2TS2Qley0FNY	\N	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
33333333-0000-0000-0000-000000000011	30000000-0000-0000-0000-000000000002	Ciclismo Seguro	Introducción al ciclismo urbano	1	video1	\N	https://www.youtube.com/embed/qbB26Zy_0Cw?si=us9OOLkZKgVX7v__	\N	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
33333333-0000-0000-0000-000000000012	30000000-0000-0000-0000-000000000002	Señales para Ciclistas	Aprende las señales	2	video1	{"pairs": 8, "theme": "cycling-signs", "difficulty": "medium"}	https://www.youtube.com/embed/BDrCs1yT1p0?si=qY7_wed7SEzr44yk	\N	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
33333333-0000-0000-0000-000000000013	30000000-0000-0000-0000-000000000002	Modelo 3D Ciclismo	Interactua con el Modelo 3D	3	modelos3D	{"questions": 12, "timePerQuestion": 25}	\N	https://sketchfab.com/models/4a6af49b0cae481ca55b64bb3f96ba95/embed	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
22222222-0000-0000-0000-000000000023	20000000-0000-0000-0000-000000000003	MODELO 3D	Interactúa con un modelo 3D	3	modelos3D	{"questions": 8, "timePerQuestion": 25}	\N	https://sketchfab.com/models/4b6204d118654baf874606bb3a916993/embed	f	2025-11-08 22:04:18.15933+00	2025-11-08 22:04:18.15933+00
\.


--
-- Data for Name: student_progress; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student_progress (id, student_id, route_id, completed, score, avg_response_time, completion_status, best_accuracy_percentage, last_accuracy_percentage, current_level_number, attempts, last_attempt_date, completion_date, created_at, updated_at) FROM stdin;
4f06a51c-97a9-48d0-b269-d861d3d53250	f00b7c3c-9335-4511-9764-78fec94700d3	22222222-0000-0000-0000-000000000001	t	80	0.00	not_started	83	0	1	0	\N	2025-11-09 01:15:50.417+00	2025-11-09 01:15:50.507788+00	2025-11-09 01:15:50.507788+00
626992c4-1cba-45fa-a83c-57d5c01ae868	f00b7c3c-9335-4511-9764-78fec94700d3	22222222-0000-0000-0000-000000000002	t	100	0.00	not_started	100	0	1	0	\N	2025-11-09 01:16:10.534+00	2025-11-09 01:16:10.535833+00	2025-11-09 01:16:10.535833+00
859323ec-8223-4006-ad07-7a3ae627a729	f00b7c3c-9335-4511-9764-78fec94700d3	22222222-0000-0000-0000-000000000003	t	72	0.00	not_started	75	0	1	0	\N	2025-11-09 01:17:30.201+00	2025-11-09 01:16:37.620045+00	2025-11-09 01:16:37.620045+00
164820e4-996b-4851-80e8-fd5e606d0db8	f00b7c3c-9335-4511-9764-78fec94700d3	22222222-0000-0000-0000-000000000004	t	64	0.00	not_started	80	0	1	0	\N	2025-11-09 01:18:09.532+00	2025-11-09 01:18:09.552128+00	2025-11-09 01:18:09.552128+00
c24a0abd-bfbd-4b7b-aab1-52baa8e9f58a	f00b7c3c-9335-4511-9764-78fec94700d3	22222222-0000-0000-0000-000000000011	t	100	0.00	not_started	100	0	1	0	\N	2025-11-09 01:18:19.382+00	2025-11-09 01:18:19.459751+00	2025-11-09 01:18:19.459751+00
61abb506-f68d-495b-ae0b-442e13550c7c	f00b7c3c-9335-4511-9764-78fec94700d3	22222222-0000-0000-0000-000000000012	t	90	0.00	not_started	90	0	1	0	\N	2025-11-09 01:21:38.141+00	2025-11-09 01:21:38.176101+00	2025-11-09 01:21:38.176101+00
d8de554c-90a3-4e56-938b-d338c183d7db	f00b7c3c-9335-4511-9764-78fec94700d3	22222222-0000-0000-0000-000000000013	t	100	3.85	completed	100	100	1	1	2025-11-09 01:21:58.624+00	2025-11-09 01:21:58.624+00	2025-11-09 01:21:58.690415+00	2025-11-09 01:21:58.690415+00
0086cee6-4f1a-46d8-9b08-45f7fc82bc5d	f00b7c3c-9335-4511-9764-78fec94700d3	22222222-0000-0000-0000-000000000021	t	100	0.00	not_started	100	0	1	0	\N	2025-11-09 01:27:53.303+00	2025-11-09 01:27:53.398177+00	2025-11-09 01:27:53.398177+00
17c32541-266f-40ff-b6c6-cfba26aa4e22	f00b7c3c-9335-4511-9764-78fec94700d3	22222222-0000-0000-0000-000000000022	t	100	0.00	not_started	100	0	1	0	\N	2025-11-09 01:35:30.412+00	2025-11-09 01:35:30.47607+00	2025-11-09 01:35:30.47607+00
2f523adf-325c-46df-a07c-a062427c524f	f00b7c3c-9335-4511-9764-78fec94700d3	22222222-0000-0000-0000-000000000023	t	100	0.00	not_started	100	0	1	0	\N	2025-11-09 01:37:53.762+00	2025-11-09 01:37:53.856483+00	2025-11-09 01:37:53.856483+00
29e63f48-d8a3-4e19-bafd-faac60840485	f402990f-13eb-4197-a30d-54eb34d5a3d8	33333333-0000-0000-0000-000000000001	t	98	0.00	not_started	100	0	1	0	\N	2025-11-09 01:42:24.329+00	2025-11-09 01:42:24.410045+00	2025-11-09 01:42:24.410045+00
a53ee95f-128c-45be-9467-807a1b3c341d	f402990f-13eb-4197-a30d-54eb34d5a3d8	33333333-0000-0000-0000-000000000011	t	100	0.00	not_started	100	0	1	0	\N	2025-11-09 01:45:25.183+00	2025-11-09 01:45:25.263498+00	2025-11-09 01:45:25.263498+00
702fe871-76f0-4ee7-8851-2248f1e05715	f402990f-13eb-4197-a30d-54eb34d5a3d8	33333333-0000-0000-0000-000000000012	t	100	0.00	not_started	100	0	1	0	\N	2025-11-09 01:46:21.951+00	2025-11-09 01:46:22.033883+00	2025-11-09 01:46:22.033883+00
99729b1c-9183-4755-b3fe-fb66da2bfc06	f402990f-13eb-4197-a30d-54eb34d5a3d8	33333333-0000-0000-0000-000000000013	t	100	0.00	not_started	100	0	1	0	\N	2025-11-09 01:48:19.629+00	2025-11-09 01:48:19.716989+00	2025-11-09 01:48:19.716989+00
bf1e1e80-e95d-48c9-a740-eafbe5a2487a	8e289215-ab39-43c2-ac2b-2037372019d6	11111111-0000-0000-0000-000000000001	t	100	0.00	not_started	100	0	1	0	\N	2025-11-09 23:16:10.091+00	2025-11-09 23:16:12.003434+00	2025-11-09 23:16:12.003434+00
586e0e0c-398a-4867-a789-e622da3ef333	8e289215-ab39-43c2-ac2b-2037372019d6	11111111-0000-0000-0000-000000000002	t	100	0.00	not_started	100	0	1	0	\N	2025-11-09 23:16:51.682+00	2025-11-09 23:16:52.844347+00	2025-11-09 23:16:52.844347+00
57816875-a991-419c-81c4-b41acd2d0725	8e289215-ab39-43c2-ac2b-2037372019d6	11111111-0000-0000-0000-000000000003	t	88	0.00	not_started	88	0	1	0	\N	2025-11-09 23:17:54.332+00	2025-11-09 23:17:55.742856+00	2025-11-09 23:17:55.742856+00
d2ac0f09-c059-45d1-b5ab-5562acbf2b6d	8e289215-ab39-43c2-ac2b-2037372019d6	11111111-0000-0000-0000-000000000011	t	100	0.00	not_started	100	0	1	0	\N	2025-11-09 23:18:37.494+00	2025-11-09 23:18:38.020701+00	2025-11-09 23:18:38.020701+00
61cce392-898e-45ad-9a59-7dbfe724bb52	8e289215-ab39-43c2-ac2b-2037372019d6	11111111-0000-0000-0000-000000000012	t	84	0.00	not_started	88	0	1	0	\N	2025-11-09 23:19:33.99+00	2025-11-09 23:19:35.275739+00	2025-11-09 23:19:35.275739+00
456ceb74-ad22-4d7e-b0da-805502111f2d	8e289215-ab39-43c2-ac2b-2037372019d6	11111111-0000-0000-0000-000000000013	t	100	5.35	completed	100	100	1	1	2025-11-09 23:20:02.409+00	2025-11-09 23:20:02.409+00	2025-11-09 23:20:04.042526+00	2025-11-09 23:20:04.042526+00
9bda2ab1-17f8-4eb9-bfcb-116855f0a110	f402990f-13eb-4197-a30d-54eb34d5a3d8	33333333-0000-0000-0000-000000000002	t	80	0.00	not_started	80	0	1	0	\N	2025-11-09 23:26:40.6+00	2025-11-09 23:26:41.782161+00	2025-11-09 23:26:41.782161+00
bb8190c6-0fc5-4aa1-806e-f7d9a8765fa2	f402990f-13eb-4197-a30d-54eb34d5a3d8	33333333-0000-0000-0000-000000000003	t	130	0.00	not_started	100	0	1	0	\N	2025-11-09 23:27:23.613+00	2025-11-09 23:27:23.947347+00	2025-11-09 23:27:23.947347+00
3a1ec061-16fe-403d-ac37-fea0c7f064f1	f402990f-13eb-4197-a30d-54eb34d5a3d8	33333333-0000-0000-0000-000000000004	t	152	0.00	not_started	90	0	1	0	\N	2025-11-09 23:27:38.213+00	2025-11-09 23:27:40.044761+00	2025-11-09 23:27:40.044761+00
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles (user_id, user_role) FROM stdin;
fc8c9557-d9c7-4e50-80ae-1b2656e90072	student
271612a2-3a45-4b89-bb74-c5046017fdfa	student
8e289215-ab39-43c2-ac2b-2037372019d6	student
05601181-af76-4acd-bc60-33e43ec5f4b3	student
0a48868e-8222-49d7-98ea-67d82af804ba	student
f00b7c3c-9335-4511-9764-78fec94700d3	student
f402990f-13eb-4197-a30d-54eb34d5a3d8	student
e9b51bb1-0ed5-45d1-b7bb-3566ca21089f	student
\.


--
-- Data for Name: messages_2025_11_07; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_11_07 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_11_08; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_11_08 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_11_09; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_11_09 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_11_10; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_11_10 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_11_11; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_11_11 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_11_12; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_11_12 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2025-11-08 22:03:58
20211116045059	2025-11-08 22:03:58
20211116050929	2025-11-08 22:03:58
20211116051442	2025-11-08 22:03:58
20211116212300	2025-11-08 22:03:58
20211116213355	2025-11-08 22:03:58
20211116213934	2025-11-08 22:03:58
20211116214523	2025-11-08 22:03:58
20211122062447	2025-11-08 22:03:58
20211124070109	2025-11-08 22:03:58
20211202204204	2025-11-08 22:03:58
20211202204605	2025-11-08 22:03:58
20211210212804	2025-11-08 22:03:58
20211228014915	2025-11-08 22:03:58
20220107221237	2025-11-08 22:03:58
20220228202821	2025-11-08 22:03:58
20220312004840	2025-11-08 22:03:58
20220603231003	2025-11-08 22:03:58
20220603232444	2025-11-08 22:03:58
20220615214548	2025-11-08 22:03:58
20220712093339	2025-11-08 22:03:58
20220908172859	2025-11-08 22:03:58
20220916233421	2025-11-08 22:03:58
20230119133233	2025-11-08 22:03:58
20230128025114	2025-11-08 22:03:58
20230128025212	2025-11-08 22:03:58
20230227211149	2025-11-08 22:03:58
20230228184745	2025-11-08 22:03:58
20230308225145	2025-11-08 22:03:58
20230328144023	2025-11-08 22:03:58
20231018144023	2025-11-08 22:03:58
20231204144023	2025-11-08 22:03:58
20231204144024	2025-11-08 22:03:58
20231204144025	2025-11-08 22:03:58
20240108234812	2025-11-08 22:03:58
20240109165339	2025-11-08 22:03:58
20240227174441	2025-11-08 22:03:58
20240311171622	2025-11-08 22:03:58
20240321100241	2025-11-08 22:03:58
20240401105812	2025-11-08 22:03:58
20240418121054	2025-11-08 22:03:58
20240523004032	2025-11-08 22:03:58
20240618124746	2025-11-08 22:03:58
20240801235015	2025-11-08 22:03:58
20240805133720	2025-11-08 22:03:58
20240827160934	2025-11-08 22:03:58
20240919163303	2025-11-08 22:03:58
20240919163305	2025-11-08 22:03:58
20241019105805	2025-11-08 22:03:58
20241030150047	2025-11-08 22:03:58
20241108114728	2025-11-08 22:03:58
20241121104152	2025-11-08 22:03:58
20241130184212	2025-11-08 22:03:58
20241220035512	2025-11-08 22:03:58
20241220123912	2025-11-08 22:03:58
20241224161212	2025-11-08 22:03:58
20250107150512	2025-11-08 22:03:58
20250110162412	2025-11-08 22:03:58
20250123174212	2025-11-08 22:03:58
20250128220012	2025-11-08 22:03:58
20250506224012	2025-11-08 22:03:58
20250523164012	2025-11-08 22:03:58
20250714121412	2025-11-08 22:03:58
20250905041441	2025-11-08 22:03:58
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id, type) FROM stdin;
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets_analytics (id, type, format, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: iceberg_namespaces; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.iceberg_namespaces (id, bucket_id, name, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: iceberg_tables; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.iceberg_tables (id, namespace_id, bucket_id, name, location, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2025-11-08 22:04:15.708197
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2025-11-08 22:04:15.714162
2	storage-schema	5c7968fd083fcea04050c1b7f6253c9771b99011	2025-11-08 22:04:15.71954
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2025-11-08 22:04:15.735221
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2025-11-08 22:04:15.750553
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2025-11-08 22:04:15.754573
6	change-column-name-in-get-size	f93f62afdf6613ee5e7e815b30d02dc990201044	2025-11-08 22:04:15.759146
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2025-11-08 22:04:15.764147
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2025-11-08 22:04:15.767113
9	fix-search-function	3a0af29f42e35a4d101c259ed955b67e1bee6825	2025-11-08 22:04:15.771379
10	search-files-search-function	68dc14822daad0ffac3746a502234f486182ef6e	2025-11-08 22:04:15.777625
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2025-11-08 22:04:15.784245
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2025-11-08 22:04:15.789427
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2025-11-08 22:04:15.794231
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2025-11-08 22:04:15.799182
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2025-11-08 22:04:15.814367
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2025-11-08 22:04:15.817882
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2025-11-08 22:04:15.821912
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2025-11-08 22:04:15.825249
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2025-11-08 22:04:15.830787
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2025-11-08 22:04:15.834784
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2025-11-08 22:04:15.838928
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2025-11-08 22:04:15.84984
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2025-11-08 22:04:15.857989
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2025-11-08 22:04:15.862801
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2025-11-08 22:04:15.867232
26	objects-prefixes	ef3f7871121cdc47a65308e6702519e853422ae2	2025-11-08 22:04:15.870287
27	search-v2	33b8f2a7ae53105f028e13e9fcda9dc4f356b4a2	2025-11-08 22:04:15.882179
28	object-bucket-name-sorting	ba85ec41b62c6a30a3f136788227ee47f311c436	2025-11-08 22:04:15.895773
29	create-prefixes	a7b1a22c0dc3ab630e3055bfec7ce7d2045c5b7b	2025-11-08 22:04:15.900512
30	update-object-levels	6c6f6cc9430d570f26284a24cf7b210599032db7	2025-11-08 22:04:15.90434
31	objects-level-index	33f1fef7ec7fea08bb892222f4f0f5d79bab5eb8	2025-11-08 22:04:15.913843
32	backward-compatible-index-on-objects	2d51eeb437a96868b36fcdfb1ddefdf13bef1647	2025-11-08 22:04:15.921714
33	backward-compatible-index-on-prefixes	fe473390e1b8c407434c0e470655945b110507bf	2025-11-08 22:04:15.930018
34	optimize-search-function-v1	82b0e469a00e8ebce495e29bfa70a0797f7ebd2c	2025-11-08 22:04:15.931293
35	add-insert-trigger-prefixes	63bb9fd05deb3dc5e9fa66c83e82b152f0caf589	2025-11-08 22:04:15.937028
36	optimise-existing-functions	81cf92eb0c36612865a18016a38496c530443899	2025-11-08 22:04:15.940256
37	add-bucket-name-length-trigger	3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1	2025-11-08 22:04:15.947798
38	iceberg-catalog-flag-on-buckets	19a8bd89d5dfa69af7f222a46c726b7c41e462c5	2025-11-08 22:04:15.953822
39	add-search-v2-sort-support	39cf7d1e6bf515f4b02e41237aba845a7b492853	2025-11-08 22:04:15.966959
40	fix-prefix-race-conditions-optimized	fd02297e1c67df25a9fc110bf8c8a9af7fb06d1f	2025-11-08 22:04:15.974918
41	add-object-level-update-trigger	44c22478bf01744b2129efc480cd2edc9a7d60e9	2025-11-08 22:04:15.9831
42	rollback-prefix-triggers	f2ab4f526ab7f979541082992593938c05ee4b47	2025-11-08 22:04:15.987602
43	fix-object-level	ab837ad8f1c7d00cc0b7310e989a23388ff29fc6	2025-11-08 22:04:15.993303
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata, level) FROM stdin;
\.


--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.prefixes (bucket_id, name, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--

COPY supabase_functions.hooks (id, hook_table_id, hook_name, created_at, request_id) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--

COPY supabase_functions.migrations (version, inserted_at) FROM stdin;
initial	2025-11-08 22:03:52.398555+00
20210809183423_update_grants	2025-11-08 22:03:52.398555+00
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: supabase_migrations; Owner: postgres
--

COPY supabase_migrations.schema_migrations (version, statements, name) FROM stdin;
20251108215304	{"-- Crear enum para roles\r\nCREATE TYPE public.app_role AS ENUM ('admin', 'teacher', 'student')","-- Crear enum para niveles educativos\r\nCREATE TYPE public.education_level AS ENUM ('preescolar', 'primaria', 'secundaria', 'bachillerato')","-- Tabla de perfiles de usuario\r\nCREATE TABLE public.profiles (\r\n  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,\r\n  email TEXT NOT NULL,\r\n  first_name TEXT NOT NULL,\r\n  last_name TEXT NOT NULL,\r\n  education_level public.education_level NOT NULL,\r\n  birth_date DATE,\r\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\r\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\r\n)","-- Tabla de roles de usuario\r\nCREATE TABLE public.user_roles (\r\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\r\n  user_id UUID NOT NULL,\r\n  role public.app_role NOT NULL,\r\n  UNIQUE(user_id, role)\r\n)","-- Tabla de cursos\r\nCREATE TABLE public.courses (\r\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\r\n  name TEXT NOT NULL,\r\n  description TEXT NOT NULL,\r\n  education_level public.education_level NOT NULL,\r\n  icon TEXT,\r\n  color TEXT DEFAULT '#4F46E5',\r\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\r\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\r\n)","-- Tabla de rutas/niveles dentro de cada curso\r\nCREATE TABLE public.routes (\r\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\r\n  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,\r\n  name TEXT NOT NULL,\r\n  description TEXT,\r\n  level_order INTEGER NOT NULL,\r\n  game_type TEXT NOT NULL, -- 'memory', 'quiz', 'drag-drop', 'video', '3d-model'\r\n  game_config JSONB, -- Configuración específica del juego\r\n  video_url TEXT, -- URL del video (si aplica)\r\n  model_3d_url TEXT, -- URL del modelo 3D (si aplica)\r\n  is_certification_level BOOLEAN DEFAULT FALSE,\r\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\r\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\r\n  UNIQUE(course_id, level_order)\r\n)","-- Tabla de progreso de estudiantes\r\nCREATE TABLE public.student_progress (\r\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\r\n  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,\r\n  route_id UUID REFERENCES public.routes(id) ON DELETE CASCADE NOT NULL,\r\n  completed BOOLEAN DEFAULT FALSE,\r\n  score INTEGER DEFAULT 0,\r\n  avg_response_time DECIMAL(10,2) DEFAULT 0,\r\n  completion_status TEXT DEFAULT 'not_started', -- 'not_started', 'in_progress', 'completed'\r\n  best_accuracy_percentage INTEGER DEFAULT 0,\r\n  last_accuracy_percentage INTEGER DEFAULT 0,\r\n  current_level_number INTEGER DEFAULT 1,\r\n  attempts INTEGER DEFAULT 0,\r\n  last_attempt_date TIMESTAMPTZ,\r\n  completion_date TIMESTAMPTZ,\r\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\r\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\r\n  UNIQUE(student_id, route_id)\r\n)","-- Habilitar Row Level Security\r\nALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY","ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY","ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY","ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY","ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY","-- Función para verificar roles\r\nCREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)\r\nRETURNS BOOLEAN\r\nLANGUAGE SQL\r\nSTABLE\r\nSECURITY DEFINER\r\nSET search_path = public\r\nAS $$\r\n  SELECT EXISTS (\r\n    SELECT 1\r\n    FROM public.user_roles\r\n    WHERE user_id = _user_id AND role = _role\r\n  )\r\n$$","-- Políticas RLS para profiles\r\nCREATE POLICY \\"Users can view their own profile\\"\r\n  ON public.profiles FOR SELECT\r\n  USING (auth.uid() = id)","CREATE POLICY \\"Users can update their own profile\\"\r\n  ON public.profiles FOR UPDATE\r\n  USING (auth.uid() = id)","-- Políticas RLS para user_roles\r\nCREATE POLICY \\"Users can view their own roles\\"\r\n  ON public.user_roles FOR SELECT\r\n  USING (auth.uid() = user_id)","CREATE POLICY \\"Admins can manage all roles\\"\r\n  ON public.user_roles FOR ALL\r\n  USING (public.has_role(auth.uid(), 'admin'))","-- Políticas RLS para courses\r\nCREATE POLICY \\"Anyone can view courses\\"\r\n  ON public.courses FOR SELECT\r\n  USING (TRUE)","CREATE POLICY \\"Teachers and admins can manage courses\\"\r\n  ON public.courses FOR ALL\r\n  USING (\r\n    public.has_role(auth.uid(), 'admin') OR \r\n    public.has_role(auth.uid(), 'teacher')\r\n  )","-- Políticas RLS para routes\r\nCREATE POLICY \\"Anyone can view routes\\"\r\n  ON public.routes FOR SELECT\r\n  USING (TRUE)","CREATE POLICY \\"Teachers and admins can manage routes\\"\r\n  ON public.routes FOR ALL\r\n  USING (\r\n    public.has_role(auth.uid(), 'admin') OR \r\n    public.has_role(auth.uid(), 'teacher')\r\n  )","-- Políticas RLS para student_progress\r\nCREATE POLICY \\"Students can view their own progress\\"\r\n  ON public.student_progress FOR SELECT\r\n  USING (auth.uid() = student_id)","CREATE POLICY \\"Students can create/update their own progress\\"\r\n  ON public.student_progress FOR INSERT\r\n  WITH CHECK (auth.uid() = student_id)","CREATE POLICY \\"Students can update their own progress\\"\r\n  ON public.student_progress FOR UPDATE\r\n  USING (auth.uid() = student_id)","CREATE POLICY \\"Teachers and admins can view all progress\\"\r\n  ON public.student_progress FOR SELECT\r\n  USING (\r\n    public.has_role(auth.uid(), 'admin') OR \r\n    public.has_role(auth.uid(), 'teacher')\r\n  )","-- Trigger para actualizar updated_at\r\nCREATE OR REPLACE FUNCTION public.update_updated_at_column()\r\nRETURNS TRIGGER AS $$\r\nBEGIN\r\n  NEW.updated_at = NOW();\r\n  RETURN NEW;\r\nEND;\r\n$$ LANGUAGE plpgsql","CREATE TRIGGER update_profiles_updated_at\r\n  BEFORE UPDATE ON public.profiles\r\n  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column()","CREATE TRIGGER update_courses_updated_at\r\n  BEFORE UPDATE ON public.courses\r\n  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column()","CREATE TRIGGER update_routes_updated_at\r\n  BEFORE UPDATE ON public.routes\r\n  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column()","CREATE TRIGGER update_student_progress_updated_at\r\n  BEFORE UPDATE ON public.student_progress\r\n  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column()"}	init_schema
\.


--
-- Data for Name: seed_files; Type: TABLE DATA; Schema: supabase_migrations; Owner: postgres
--

COPY supabase_migrations.seed_files (path, hash) FROM stdin;
supabase/seed.sql	fd181958d8c5f98ba1016d993089a7697ad7dfb867f73840f8fa9aeb4ed004fc
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 78, true);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('supabase_functions.hooks_id_seq', 1, false);


--
-- Name: extensions extensions_pkey; Type: CONSTRAINT; Schema: _realtime; Owner: supabase_admin
--

ALTER TABLE ONLY _realtime.extensions
    ADD CONSTRAINT extensions_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: _realtime; Owner: supabase_admin
--

ALTER TABLE ONLY _realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: tenants tenants_pkey; Type: CONSTRAINT; Schema: _realtime; Owner: supabase_admin
--

ALTER TABLE ONLY _realtime.tenants
    ADD CONSTRAINT tenants_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: oauth_authorizations oauth_authorizations_authorization_code_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_code_key UNIQUE (authorization_code);


--
-- Name: oauth_authorizations oauth_authorizations_authorization_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_id_key UNIQUE (authorization_id);


--
-- Name: oauth_authorizations oauth_authorizations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_pkey PRIMARY KEY (id);


--
-- Name: oauth_clients oauth_clients_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_clients
    ADD CONSTRAINT oauth_clients_pkey PRIMARY KEY (id);


--
-- Name: oauth_consents oauth_consents_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_pkey PRIMARY KEY (id);


--
-- Name: oauth_consents oauth_consents_user_client_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_client_unique UNIQUE (user_id, client_id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: routes routes_course_id_level_order_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routes
    ADD CONSTRAINT routes_course_id_level_order_key UNIQUE (course_id, level_order);


--
-- Name: routes routes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routes
    ADD CONSTRAINT routes_pkey PRIMARY KEY (id);


--
-- Name: student_progress student_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_progress
    ADD CONSTRAINT student_progress_pkey PRIMARY KEY (id);


--
-- Name: student_progress student_progress_student_id_route_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_progress
    ADD CONSTRAINT student_progress_student_id_route_id_key UNIQUE (student_id, route_id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_id);


--
-- Name: user_roles user_roles_user_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_unique UNIQUE (user_id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_11_07 messages_2025_11_07_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_11_07
    ADD CONSTRAINT messages_2025_11_07_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_11_08 messages_2025_11_08_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_11_08
    ADD CONSTRAINT messages_2025_11_08_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_11_09 messages_2025_11_09_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_11_09
    ADD CONSTRAINT messages_2025_11_09_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_11_10 messages_2025_11_10_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_11_10
    ADD CONSTRAINT messages_2025_11_10_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_11_11 messages_2025_11_11_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_11_11
    ADD CONSTRAINT messages_2025_11_11_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_11_12 messages_2025_11_12_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_11_12
    ADD CONSTRAINT messages_2025_11_12_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets_analytics buckets_analytics_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets_analytics
    ADD CONSTRAINT buckets_analytics_pkey PRIMARY KEY (id);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: iceberg_namespaces iceberg_namespaces_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.iceberg_namespaces
    ADD CONSTRAINT iceberg_namespaces_pkey PRIMARY KEY (id);


--
-- Name: iceberg_tables iceberg_tables_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.iceberg_tables
    ADD CONSTRAINT iceberg_tables_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: prefixes prefixes_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.prefixes
    ADD CONSTRAINT prefixes_pkey PRIMARY KEY (bucket_id, level, name);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: hooks hooks_pkey; Type: CONSTRAINT; Schema: supabase_functions; Owner: supabase_functions_admin
--

ALTER TABLE ONLY supabase_functions.hooks
    ADD CONSTRAINT hooks_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: supabase_functions; Owner: supabase_functions_admin
--

ALTER TABLE ONLY supabase_functions.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (version);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: supabase_migrations; Owner: postgres
--

ALTER TABLE ONLY supabase_migrations.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: seed_files seed_files_pkey; Type: CONSTRAINT; Schema: supabase_migrations; Owner: postgres
--

ALTER TABLE ONLY supabase_migrations.seed_files
    ADD CONSTRAINT seed_files_pkey PRIMARY KEY (path);


--
-- Name: extensions_tenant_external_id_index; Type: INDEX; Schema: _realtime; Owner: supabase_admin
--

CREATE INDEX extensions_tenant_external_id_index ON _realtime.extensions USING btree (tenant_external_id);


--
-- Name: extensions_tenant_external_id_type_index; Type: INDEX; Schema: _realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX extensions_tenant_external_id_type_index ON _realtime.extensions USING btree (tenant_external_id, type);


--
-- Name: tenants_external_id_index; Type: INDEX; Schema: _realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX tenants_external_id_index ON _realtime.tenants USING btree (external_id);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: oauth_auth_pending_exp_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_auth_pending_exp_idx ON auth.oauth_authorizations USING btree (expires_at) WHERE (status = 'pending'::auth.oauth_authorization_status);


--
-- Name: oauth_clients_deleted_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_clients_deleted_at_idx ON auth.oauth_clients USING btree (deleted_at);


--
-- Name: oauth_consents_active_client_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_active_client_idx ON auth.oauth_consents USING btree (client_id) WHERE (revoked_at IS NULL);


--
-- Name: oauth_consents_active_user_client_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_active_user_client_idx ON auth.oauth_consents USING btree (user_id, client_id) WHERE (revoked_at IS NULL);


--
-- Name: oauth_consents_user_order_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_user_order_idx ON auth.oauth_consents USING btree (user_id, granted_at DESC);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_oauth_client_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_oauth_client_id_idx ON auth.sessions USING btree (oauth_client_id);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: sso_providers_resource_id_pattern_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_providers_resource_id_pattern_idx ON auth.sso_providers USING btree (resource_id text_pattern_ops);


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: messages_inserted_at_topic_index; Type: INDEX; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE INDEX messages_inserted_at_topic_index ON ONLY realtime.messages USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2025_11_07_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2025_11_07_inserted_at_topic_idx ON realtime.messages_2025_11_07 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2025_11_08_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2025_11_08_inserted_at_topic_idx ON realtime.messages_2025_11_08 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2025_11_09_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2025_11_09_inserted_at_topic_idx ON realtime.messages_2025_11_09 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2025_11_10_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2025_11_10_inserted_at_topic_idx ON realtime.messages_2025_11_10 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2025_11_11_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2025_11_11_inserted_at_topic_idx ON realtime.messages_2025_11_11 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2025_11_12_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2025_11_12_inserted_at_topic_idx ON realtime.messages_2025_11_12 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: subscription_subscription_id_entity_filters_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_key ON realtime.subscription USING btree (subscription_id, entity, filters);


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: idx_iceberg_namespaces_bucket_id; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX idx_iceberg_namespaces_bucket_id ON storage.iceberg_namespaces USING btree (bucket_id, name);


--
-- Name: idx_iceberg_tables_namespace_id; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX idx_iceberg_tables_namespace_id ON storage.iceberg_tables USING btree (namespace_id, name);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_name_bucket_level_unique; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX idx_name_bucket_level_unique ON storage.objects USING btree (name COLLATE "C", bucket_id, level);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: idx_objects_lower_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_lower_name ON storage.objects USING btree ((path_tokens[level]), lower(name) text_pattern_ops, bucket_id, level);


--
-- Name: idx_prefixes_lower_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_prefixes_lower_name ON storage.prefixes USING btree (bucket_id, level, ((string_to_array(name, '/'::text))[level]), lower(name) text_pattern_ops);


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: objects_bucket_id_level_idx; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX objects_bucket_id_level_idx ON storage.objects USING btree (bucket_id, level, name COLLATE "C");


--
-- Name: supabase_functions_hooks_h_table_id_h_name_idx; Type: INDEX; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE INDEX supabase_functions_hooks_h_table_id_h_name_idx ON supabase_functions.hooks USING btree (hook_table_id, hook_name);


--
-- Name: supabase_functions_hooks_request_id_idx; Type: INDEX; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE INDEX supabase_functions_hooks_request_id_idx ON supabase_functions.hooks USING btree (request_id);


--
-- Name: messages_2025_11_07_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2025_11_07_inserted_at_topic_idx;


--
-- Name: messages_2025_11_07_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_11_07_pkey;


--
-- Name: messages_2025_11_08_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2025_11_08_inserted_at_topic_idx;


--
-- Name: messages_2025_11_08_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_11_08_pkey;


--
-- Name: messages_2025_11_09_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2025_11_09_inserted_at_topic_idx;


--
-- Name: messages_2025_11_09_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_11_09_pkey;


--
-- Name: messages_2025_11_10_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2025_11_10_inserted_at_topic_idx;


--
-- Name: messages_2025_11_10_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_11_10_pkey;


--
-- Name: messages_2025_11_11_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2025_11_11_inserted_at_topic_idx;


--
-- Name: messages_2025_11_11_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_11_11_pkey;


--
-- Name: messages_2025_11_12_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2025_11_12_inserted_at_topic_idx;


--
-- Name: messages_2025_11_12_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_11_12_pkey;


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: buckets enforce_bucket_name_length_trigger; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER enforce_bucket_name_length_trigger BEFORE INSERT OR UPDATE OF name ON storage.buckets FOR EACH ROW EXECUTE FUNCTION storage.enforce_bucket_name_length();


--
-- Name: objects objects_delete_delete_prefix; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER objects_delete_delete_prefix AFTER DELETE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger();


--
-- Name: objects objects_insert_create_prefix; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER objects_insert_create_prefix BEFORE INSERT ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.objects_insert_prefix_trigger();


--
-- Name: objects objects_update_create_prefix; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER objects_update_create_prefix BEFORE UPDATE ON storage.objects FOR EACH ROW WHEN (((new.name <> old.name) OR (new.bucket_id <> old.bucket_id))) EXECUTE FUNCTION storage.objects_update_prefix_trigger();


--
-- Name: prefixes prefixes_create_hierarchy; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER prefixes_create_hierarchy BEFORE INSERT ON storage.prefixes FOR EACH ROW WHEN ((pg_trigger_depth() < 1)) EXECUTE FUNCTION storage.prefixes_insert_trigger();


--
-- Name: prefixes prefixes_delete_hierarchy; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER prefixes_delete_hierarchy AFTER DELETE ON storage.prefixes FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: extensions extensions_tenant_external_id_fkey; Type: FK CONSTRAINT; Schema: _realtime; Owner: supabase_admin
--

ALTER TABLE ONLY _realtime.extensions
    ADD CONSTRAINT extensions_tenant_external_id_fkey FOREIGN KEY (tenant_external_id) REFERENCES _realtime.tenants(external_id) ON DELETE CASCADE;


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_oauth_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_oauth_client_id_fkey FOREIGN KEY (oauth_client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: routes routes_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routes
    ADD CONSTRAINT routes_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- Name: student_progress student_progress_route_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_progress
    ADD CONSTRAINT student_progress_route_id_fkey FOREIGN KEY (route_id) REFERENCES public.routes(id) ON DELETE CASCADE;


--
-- Name: student_progress student_progress_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_progress
    ADD CONSTRAINT student_progress_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: iceberg_namespaces iceberg_namespaces_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.iceberg_namespaces
    ADD CONSTRAINT iceberg_namespaces_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets_analytics(id) ON DELETE CASCADE;


--
-- Name: iceberg_tables iceberg_tables_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.iceberg_tables
    ADD CONSTRAINT iceberg_tables_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets_analytics(id) ON DELETE CASCADE;


--
-- Name: iceberg_tables iceberg_tables_namespace_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.iceberg_tables
    ADD CONSTRAINT iceberg_tables_namespace_id_fkey FOREIGN KEY (namespace_id) REFERENCES storage.iceberg_namespaces(id) ON DELETE CASCADE;


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: prefixes prefixes_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.prefixes
    ADD CONSTRAINT "prefixes_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles Allow read access to all profiles; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow read access to all profiles" ON public.profiles FOR SELECT USING (true);


--
-- Name: courses Anyone can view courses; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can view courses" ON public.courses FOR SELECT USING (true);


--
-- Name: routes Anyone can view routes; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can view routes" ON public.routes FOR SELECT USING (true);


--
-- Name: student_progress Students can create/update their own progress; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Students can create/update their own progress" ON public.student_progress FOR INSERT WITH CHECK ((auth.uid() = student_id));


--
-- Name: student_progress Students can update their own progress; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Students can update their own progress" ON public.student_progress FOR UPDATE USING ((auth.uid() = student_id));


--
-- Name: student_progress Students can view their own progress; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Students can view their own progress" ON public.student_progress FOR SELECT USING ((auth.uid() = student_id));


--
-- Name: profiles Users can insert their own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK ((auth.uid() = id));


--
-- Name: user_roles Users can insert their own role; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert their own role" ON public.user_roles FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: profiles Users can update their own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING ((auth.uid() = id));


--
-- Name: profiles Users can view their own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING ((auth.uid() = id));


--
-- Name: user_roles Users can view their own role; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view their own role" ON public.user_roles FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: user_roles Users can view their own roles; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: courses; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: routes; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;

--
-- Name: student_progress; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets_analytics; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets_analytics ENABLE ROW LEVEL SECURITY;

--
-- Name: iceberg_namespaces; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.iceberg_namespaces ENABLE ROW LEVEL SECURITY;

--
-- Name: iceberg_tables; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.iceberg_tables ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: prefixes; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.prefixes ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT USAGE ON SCHEMA auth TO postgres;


--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- Name: SCHEMA net; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA net TO supabase_functions_admin;
GRANT USAGE ON SCHEMA net TO postgres;
GRANT USAGE ON SCHEMA net TO anon;
GRANT USAGE ON SCHEMA net TO authenticated;
GRANT USAGE ON SCHEMA net TO service_role;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA storage TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- Name: SCHEMA supabase_functions; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA supabase_functions TO postgres;
GRANT USAGE ON SCHEMA supabase_functions TO anon;
GRANT USAGE ON SCHEMA supabase_functions TO authenticated;
GRANT USAGE ON SCHEMA supabase_functions TO service_role;
GRANT ALL ON SCHEMA supabase_functions TO supabase_functions_admin;


--
-- Name: SCHEMA vault; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA vault TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA vault TO service_role;


--
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;


--
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;


--
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;


--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- Name: FUNCTION http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer); Type: ACL; Schema: net; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
GRANT ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin;
GRANT ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO postgres;
GRANT ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO anon;
GRANT ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO authenticated;
GRANT ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO service_role;


--
-- Name: FUNCTION http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer); Type: ACL; Schema: net; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
GRANT ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin;
GRANT ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO postgres;
GRANT ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO anon;
GRANT ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO authenticated;
GRANT ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO service_role;


--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO postgres;


--
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;


--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;


--
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;


--
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;


--
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;


--
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- Name: FUNCTION http_request(); Type: ACL; Schema: supabase_functions; Owner: supabase_functions_admin
--

REVOKE ALL ON FUNCTION supabase_functions.http_request() FROM PUBLIC;
GRANT ALL ON FUNCTION supabase_functions.http_request() TO postgres;
GRANT ALL ON FUNCTION supabase_functions.http_request() TO anon;
GRANT ALL ON FUNCTION supabase_functions.http_request() TO authenticated;
GRANT ALL ON FUNCTION supabase_functions.http_request() TO service_role;


--
-- Name: FUNCTION _crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO service_role;


--
-- Name: FUNCTION create_secret(new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: FUNCTION update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.flow_state TO dashboard_user;


--
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.identities TO dashboard_user;


--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_factors TO dashboard_user;


--
-- Name: TABLE oauth_authorizations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_authorizations TO postgres;
GRANT ALL ON TABLE auth.oauth_authorizations TO dashboard_user;


--
-- Name: TABLE oauth_clients; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_clients TO postgres;
GRANT ALL ON TABLE auth.oauth_clients TO dashboard_user;


--
-- Name: TABLE oauth_consents; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_consents TO postgres;
GRANT ALL ON TABLE auth.oauth_consents TO dashboard_user;


--
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_providers TO dashboard_user;


--
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT ON TABLE auth.schema_migrations TO postgres WITH GRANT OPTION;


--
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sessions TO dashboard_user;


--
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_domains TO dashboard_user;


--
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_providers TO dashboard_user;


--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;


--
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;


--
-- Name: TABLE courses; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.courses TO anon;
GRANT ALL ON TABLE public.courses TO authenticated;
GRANT ALL ON TABLE public.courses TO service_role;


--
-- Name: TABLE profiles; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.profiles TO anon;
GRANT ALL ON TABLE public.profiles TO authenticated;
GRANT ALL ON TABLE public.profiles TO service_role;


--
-- Name: TABLE routes; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.routes TO anon;
GRANT ALL ON TABLE public.routes TO authenticated;
GRANT ALL ON TABLE public.routes TO service_role;


--
-- Name: TABLE student_progress; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.student_progress TO anon;
GRANT ALL ON TABLE public.student_progress TO authenticated;
GRANT ALL ON TABLE public.student_progress TO service_role;


--
-- Name: TABLE user_roles; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_roles TO anon;
GRANT ALL ON TABLE public.user_roles TO authenticated;
GRANT ALL ON TABLE public.user_roles TO service_role;


--
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON TABLE realtime.messages TO postgres;
GRANT ALL ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- Name: TABLE messages_2025_11_07; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_11_07 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_11_07 TO dashboard_user;


--
-- Name: TABLE messages_2025_11_08; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_11_08 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_11_08 TO dashboard_user;


--
-- Name: TABLE messages_2025_11_09; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_11_09 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_11_09 TO dashboard_user;


--
-- Name: TABLE messages_2025_11_10; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_11_10 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_11_10 TO dashboard_user;


--
-- Name: TABLE messages_2025_11_11; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_11_11 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_11_11 TO dashboard_user;


--
-- Name: TABLE messages_2025_11_12; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_11_12 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_11_12 TO dashboard_user;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.schema_migrations TO postgres;
GRANT ALL ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT ALL ON TABLE realtime.schema_migrations TO supabase_realtime_admin;


--
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.subscription TO postgres;
GRANT ALL ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT ALL ON TABLE realtime.subscription TO supabase_realtime_admin;


--
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;


--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO postgres WITH GRANT OPTION;


--
-- Name: TABLE buckets_analytics; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets_analytics TO service_role;
GRANT ALL ON TABLE storage.buckets_analytics TO authenticated;
GRANT ALL ON TABLE storage.buckets_analytics TO anon;


--
-- Name: TABLE iceberg_namespaces; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.iceberg_namespaces TO service_role;
GRANT SELECT ON TABLE storage.iceberg_namespaces TO authenticated;
GRANT SELECT ON TABLE storage.iceberg_namespaces TO anon;


--
-- Name: TABLE iceberg_tables; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.iceberg_tables TO service_role;
GRANT SELECT ON TABLE storage.iceberg_tables TO authenticated;
GRANT SELECT ON TABLE storage.iceberg_tables TO anon;


--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO postgres WITH GRANT OPTION;


--
-- Name: TABLE prefixes; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.prefixes TO service_role;
GRANT ALL ON TABLE storage.prefixes TO authenticated;
GRANT ALL ON TABLE storage.prefixes TO anon;


--
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;


--
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;


--
-- Name: TABLE hooks; Type: ACL; Schema: supabase_functions; Owner: supabase_functions_admin
--

GRANT ALL ON TABLE supabase_functions.hooks TO postgres;
GRANT ALL ON TABLE supabase_functions.hooks TO anon;
GRANT ALL ON TABLE supabase_functions.hooks TO authenticated;
GRANT ALL ON TABLE supabase_functions.hooks TO service_role;


--
-- Name: SEQUENCE hooks_id_seq; Type: ACL; Schema: supabase_functions; Owner: supabase_functions_admin
--

GRANT ALL ON SEQUENCE supabase_functions.hooks_id_seq TO postgres;
GRANT ALL ON SEQUENCE supabase_functions.hooks_id_seq TO anon;
GRANT ALL ON SEQUENCE supabase_functions.hooks_id_seq TO authenticated;
GRANT ALL ON SEQUENCE supabase_functions.hooks_id_seq TO service_role;


--
-- Name: TABLE migrations; Type: ACL; Schema: supabase_functions; Owner: supabase_functions_admin
--

GRANT ALL ON TABLE supabase_functions.migrations TO postgres;
GRANT ALL ON TABLE supabase_functions.migrations TO anon;
GRANT ALL ON TABLE supabase_functions.migrations TO authenticated;
GRANT ALL ON TABLE supabase_functions.migrations TO service_role;


--
-- Name: TABLE secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.secrets TO service_role;


--
-- Name: TABLE decrypted_secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.decrypted_secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.decrypted_secrets TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: supabase_functions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: supabase_functions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: supabase_functions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON TABLES TO service_role;


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO supabase_admin;

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--

\unrestrict aWRxthXstb5ZqSiRwjz1mgSYNdeAjj93lIwMTUVAwkj5xxyBQMRKYp3pd5iqjol

--
-- PostgreSQL database cluster dump complete
--

