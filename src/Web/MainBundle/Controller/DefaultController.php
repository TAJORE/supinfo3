<?php

namespace Web\MainBundle\Controller;

use AppBundle\Entity\User;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Security;
use Web\AppBundle\Tools\FunglobeUserProvider;
use Web\AppBundle\Tools\FunglobeUtils;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Web\AppBundle\Tools\RestClient;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="main_homepage", options={"expose"=true})
     */
    public function indexAction()
    {
        return $this->redirect($this->generateUrl("main_register"));
    }


    /**
     * @Route("/confirm/email", name="main_confirm", options={"expose"=true})
     */
    public function confirmAction(Request $request)
    {
        $email = $request->get("email");
        $password = $request->get("password");
        $lastkey = $request->get("key");
        $key = md5($password.$email);

        if($key==$lastkey)
        {
            $array = ["code"=>"ok"];
        }
        else{
            $array = ["code"=>"n==bad"];
        }
        return $this->render('MainBundle:Default:register.html.twig',$array);
    }

    /**
     * @Route("/register", name="main_register")
     */
    public function registerAction(Request $request)
    {
        $array = [];
        return $this->render('MainBundle:Default:register.html.twig',$array);
    }


    /**
     * @Route("/login", name="main_login")
     */
    public function loginAction(Request $request)
    {
        $datas = ['error' => '', 'username' => ''];

        /** @var AuthenticationException $error */
        $error = $request->getSession()->get(Security::AUTHENTICATION_ERROR);

        if(!is_null($error)){
            $datas['error'] = $error->getMessage();
            $datas['username'] = $request->getSession()->get(Security::LAST_USERNAME);

            $request->getSession()->remove(Security::AUTHENTICATION_ERROR);
            $request->getSession()->remove(Security::LAST_USERNAME);
        }

        return $this->render('MainBundle:Default:login.html.twig', $datas);
    }

    /**
     * @Route("/logout", name="main_logout")
     */
    public function logoutAction(Request $request)
    {
        $this->get('security.context')->setToken(null);
    }

    /**
     * @Route("/forgot-password", name="main_forgot_password")
     */
    public function forgotAction(Request $request)
    {
        $array = [];
        return $this->render('MainBundle:Default:forgot-password.html.twig', $array);
    }

    /**
     * @Route("/reset-password", name="main_reset_password")
     */
    public function resetAction(Request $request)
    {
        $array = ['valid' => 1, 'message' => ""];

        $email = $request->get('email');
        $token = $request->get('confirmationtoken');

        ///TODO Envoyer un requete pour vérifier la validité
        if(!isset($email) || !isset($token)){
            return $this->redirect($this->generateUrl("main_login"));
        }

        if($request->isMethod('POST'))
        {
            $password = $request->get('password');

            if(!isset($password)){
                return $this->redirect($this->generateUrl("main_login"));
            }
            else
            {
                $data = ['email' => $email, 'password' => $password];

                $client = new RestClient(RestClient::$PUT_METHOD, 'reset-password', null, $data);

                if($client->getStatusCode() == 200)
                {
                    $contents = \GuzzleHttp\json_decode($client->getContent());

                    $array['valid'] = 2;
                    $array['message'] = $client->getContent();
                }
                else{
                    $array['valid'] = 0;
                    $array['message'] = $client->getContent();
                }
            }
        }
        else
        {
            $data = ['email' => $email, 'token' => $token];

            $client = new RestClient(RestClient::$POST_METHOD, 'verify-reset-password', null, $data);

            if ($client->getStatusCode() == 200) {
                $contents = \GuzzleHttp\json_decode($client->getContent());
            } else {
                $array['valid'] = 0;
                $array['message'] = $client->getContent();
            }
        }

        return $this->render('MainBundle:Default:reset-password.html.twig', $array);
    }
}
