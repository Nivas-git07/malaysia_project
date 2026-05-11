import { useState } from "react";
import { get_state } from "../../api/auth";
import { useQuery } from "@tanstack/react-query";

export default function CoachForm({
  onSubmit,
}) {
  const [full_name, setFullName] =
    useState("");

  const [state, setState] = useState("");

  const [email_id, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [expert_discipline, setDiscipline] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [errors, setErrors] = useState({});

  const { data: stateData } = useQuery({
    queryKey: ["states"],
    queryFn: get_state,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const states = stateData?.data || [];

  // =========================
  // VALIDATION
  // =========================
  const validate = () => {
    const newErrors = {};

    if (!full_name)
      newErrors.full_name =
        "Full name required";

    if (!state)
      newErrors.state =
        "Select state";

    if (!email_id)
      newErrors.email_id =
        "Email required";

    if (!password)
      newErrors.password =
        "Password required";

    if (!expert_discipline)
      newErrors.expert_discipline =
        "Select discipline";

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setFullName("");
    setState("");
    setEmail("");
    setPassword("");
    setDiscipline("");
    setErrors({});
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      await onSubmit({
        full_name,
        state,
        email_id,
        password,
        expert_discipline,
      });

      // reset after success
      resetForm();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="regForm"
      onSubmit={handleSubmit}
    >
      {/* NAME + STATE */}
      <div className="regGridLabel">
        <p className="regRowLabel">
          Coach Name
        </p>

        <p className="regRowLabel">
          State / Region
        </p>
      </div>

      <div className="regGrid">
        <div>
          <input
            className="regInput"
            placeholder="Full Name"
            value={full_name}
            onChange={(e) =>
              setFullName(
                e.target.value
              )
            }
          />

          {errors.full_name && (
            <span className="errorText">
              {errors.full_name}
            </span>
          )}
        </div>

        <div>
          <select
            className="regSelect"
            value={state}
            onChange={(e) =>
              setState(
                e.target.value
              )
            }
          >
            <option value="">
              Select State
            </option>

            {states.map((s) => (
              <option
                key={s.user}
                value={s.user}
              >
                {s.state_name}
              </option>
            ))}
          </select>

          {errors.state && (
            <span className="errorText">
              {errors.state}
            </span>
          )}
        </div>
      </div>

      {/* EMAIL + DISCIPLINE */}
      <div className="regGridLabel">
        <p className="regRowLabel">
          Email
        </p>

        <p className="regRowLabel">
          Expert Discipline
        </p>
      </div>

      <div className="regGrid">
        <div>
          <input
            className="regInput"
            placeholder="example@gmail.com"
            value={email_id}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          {errors.email_id && (
            <span className="errorText">
              {errors.email_id}
            </span>
          )}
        </div>

        <div>
          <select
            className="regSelect"
            value={expert_discipline}
            onChange={(e) =>
              setDiscipline(
                e.target.value
              )
            }
          >
            <option value="">
              Select Discipline
            </option>

            <option value="SURFACE">
              Surface
            </option>

            <option value="BI_FINS">
              Bi-Fins
            </option>

            <option value="APNEA">
              Apnea
            </option>

            <option value="IMMERSION">
              Immersion
            </option>
          </select>

          {errors.expert_discipline && (
            <span className="errorText">
              {
                errors.expert_discipline
              }
            </span>
          )}
        </div>
      </div>

      {/* PASSWORD */}
      <p className="regRowLabel">
        Password
      </p>

      <input
        type="password"
        className="regInput full"
        placeholder="********"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
      />

      {errors.password && (
        <span className="errorText">
          {errors.password}
        </span>
      )}

      <button
        className="regBtn"
        disabled={loading}
      >
        {loading
          ? "Registering..."
          : "Register"}
      </button>
    </form>
  );
}