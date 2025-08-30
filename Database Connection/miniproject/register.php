<?php

include 'db.php';
if ($_SERVER["REQUEST_METHOD"]==="POST"){
    $username=$conn->real_escape_string($_POST["username"]);
   $password=password_hash($_POST["password"],
   PASSWORD_DEFAULT);

   $check=$conn->query("SELECT * FROM users Where username='$username'");
   if($check->num_rows > 0){
    $msg="Username exists!";

   }
else{
    $conn->query("INSERT INTO users (username, password) 
    VALUES ('$username','$password')");
    $msg= "User Created";
}

}
?>



<div class="form-container">
    <form method="POST">
    <h2>Register</h2>
    <input type='text' name='username' placeholder='username' required ><br>
    <input type='password' name="password"
    placeholder="password" required><br>
    <button type="submit">Register</button>
    <p> Already have account? <a href="login.php">Login here</a></p>

    <?php
    if(isset($msg)) echo "<p class='error'>$msg</p>";

    ?>

</form>
</div>